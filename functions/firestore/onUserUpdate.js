// ⬇️ IMPORTS
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// ⏺  DEFINE CONSTANTS
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// 🔥 FIRESTORE TRIGGER
exports.onUserUpdate = functions
  .region("europe-west1")
  .firestore.document("users/{userId}")
  .onUpdate((change) => {
    functions.logger.info(
      "🔥 Firestore triggered: user updated (after)",
      change.after.data()
    );
    functions.logger.info(
      "🔥 Firestore triggered: user updated (before)",
      change.before.data()
    );

    const user = change.after.data();

    // UPDATE ACTIONS
    updateMemberProfile(user);

    return 0;
  });

/* 🌊 UPDATE MEMBERS PROFILE
The 'members profile' is stored as a subcollection of a specific movement.
*/
function updateMemberProfile(user) {
  functions.logger.info("🔵 Function started: updateMemberProfile", user);

  if (user.movements && user.movements[0]) {
    user.movements.forEach((movementID) => {
      const memberProfileRef = db
        .collection("movements")
        .doc(movementID)
        .collection("members")
        .doc(user.id);

      const member = {};

      // We don't want to share everything from the user document, so we only share the data relevant for their profile. If a value is undefined, we set it to an empty string.
      // Add info from user profile to movement member profile
      member.id = user.id ? user.id : "";
      member.emailAddress = user.emailAddress ? user.emailAddress : "";
      member.phoneNumber = user.phoneNumber ? user.phoneNumber : "";
      member.firstName = user.firstName ? user.firstName : "";
      member.lastName = user.lastName ? user.lastName : "";
      member.location = user.location ? user.location : "";
      member.timestampUserProfileLastUpdated = FieldValue.serverTimestamp();

      memberProfileRef
        .set(member, { merge: true })
        .then(() => {
          functions.logger.error("🟢 Setting member profile succesful", member);
        })
        .catch((error) => {
          functions.logger.error("🔴 Failed to set member profile", error);
        });
    });
  } else {
    functions.logger.error("🔴 No movements found to update", user);
  }
}
