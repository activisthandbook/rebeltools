// ⬇️ IMPORTS
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// ⏺  DEFINE CONSTANTS
const db = admin.firestore();
const Counter = require("../distributed_counter");
const FieldValue = admin.firestore.FieldValue;

// 🔥 FIRESTORE TRIGGER
exports.onActionCreate = functions
  .region("europe-west1")
  .firestore.document("actions/{actionId}")
  .onCreate((snap) => {
    functions.logger.info(
      "🔥 Firestore triggered: action created",
      snap.data()
    );

    // Get an object representing the document
    const actionInstance = snap.data();

    // UPDATE ACTIONS
    updateProfiles(actionInstance);
    updateSignupCount(actionInstance);
  });

// 🔢 UPDATE SIGNUP COUNT
function updateSignupCount(actionInstance) {
  functions.logger.info(
    "🔵 Function started: updateSignupCount",
    actionInstance
  );

  let collection = "";

  switch (actionInstance.actionType) {
    case "movement":
      collection = "movements";
      break;
    case "event":
      collection = "calendar";
      break;
  }

  const signupCount = new Counter(
    db.collection(collection).doc(actionInstance.actionID),
    "countSignups"
  );
  return signupCount.incrementBy(1);
}

/* 👋 UPDATE PROFILES
The 'members profile' is stored as a subcollection of a specific movement. The 'user profile' is stored in the 'users' collection.
*/
function updateProfiles(actionInstance) {
  functions.logger.info(
    "🔵 Function started: updateMemberProfile",
    actionInstance
  );

  const userProfileRef = db.collection("users").doc(actionInstance.userID);
  const memberProfileRef = db
    .collection("movements")
    .doc(actionInstance.movementID)
    .collection("members")
    .doc(actionInstance.userID);

  return userProfileRef
    .get()
    .then((doc) => {
      functions.logger.info("🟢 Fetching user profile succesful", doc);

      let member = {};

      if (doc.exists) {
        const user = doc.data();

        // If this is the first time the user has signed up for this movement, we need to create a new member profile.
        if (
          !user.movements ||
          !user.movements.includes(actionInstance.movementID)
        ) {
          // Add info from user profile to movement member profile
          member.id = user.id ? user.id : "";
          member.emailAddress = user.emailAddress ? user.emailAddress : "";
          member.phoneNumber = user.phoneNumber ? user.phoneNumber : "";
          member.firstName = user.firstName ? user.firstName : "";
          member.lastName = user.lastName ? user.lastName : "";
          member.location = user.location ? user.location : "";
          member.timestampFirstAction = FieldValue.serverTimestamp();
          functions.logger.info(
            "🔵 First action of user for this movement",
            user
          );
        } else {
          functions.logger.info(
            "🔵 Not first action of user for this movement",
            user
          );
        }
      } else {
        // Fallback: even though the Firestore user profile has not been created yet, we can still get some data from their Firebase auth profile.
        member.id = actionInstance.userID;
        member.timestampFirstAction = FieldValue.serverTimestamp();

        admin
          .getAuth()
          .getUser(actionInstance.userID)
          .then((userRecord) => {
            member.emailAddress = userRecord.emailAddress;
          })
          .catch((error) => {
            console.log("🔴 Could not fetch auth user data", error);
          });
        functions.logger.error("🟠User profile not found");
      }

      member.timestampLastAction = FieldValue.serverTimestamp();
      member.countAllSignups = FieldValue.increment(1);

      switch (actionInstance.actionType) {
        case "movement":
          member.member = true;
          break;
        case "event":
          member.eventSignups = FieldValue.arrayUnion(actionInstance.actionID);
          member.countEventSignups = FieldValue.increment(1);
          break;
        case "campaign":
          member.campaignSignups = FieldValue.arrayUnion(
            actionInstance.actionID
          );
          member.countCampaignSignups = FieldValue.increment(1);
          break;
      }

      // Update the members profile
      memberProfileRef
        .set(member, { merge: true })
        .then(() => {
          functions.logger.info("🟢 Setting member profile succesful", member);
        })
        .catch((error) => {
          functions.logger.error(
            "🔴 Error in updateMemberProfile function",
            error
          );
        });

      // If the user profile does not exist yet, or if this is the first time the user has signed up for this movement, we need to add this movement to the user profile.
      if (!doc.extists || !doc.data().includes(actionInstance.movementID)) {
        const userProfileData = {
          movements: FieldValue.arrayUnion(actionInstance.movementID),
        };

        return userProfileRef
          .set(userProfileData, { merge: true })
          .then(() => {
            functions.logger.info(
              "🟢 Added movement to user profile succesfully",
              userProfileData
            );
            return;
          })
          .catch((error) => {
            functions.logger.error(
              "🔴 Error in adding movement to user profile",
              error
            );
          });
      }
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in ferching user profile", error);
    });
}
