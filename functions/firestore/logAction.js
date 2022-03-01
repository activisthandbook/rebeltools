// ⬇️ IMPORTS
const functions = require('firebase-functions')
const admin = require('firebase-admin');

// 🔄 INITIALISATIONS
admin.initializeApp();

// ⏺  DEFINE CONSTANTS
const db = admin.firestore();
const Counter = require("../distributed_counter")
const FieldValue = admin.firestore.FieldValue;

// 🔥 FIRESTORE TRIGGER
exports.logAction = functions.region('europe-west1').firestore
  .document('actions/{actionId}')
  .onCreate((snap) => {
    functions.logger.info('🔥 Firestore triggered: action created')

    // Get an object representing the document
    const actionInstance = snap.data()

    // UPDATE ACTIONS
    updateSignupCount(actionInstance)
    updateUserProfile(actionInstance)
    updateMemberProfile(actionInstance)

  })

// 🔢 UPDATE SIGNUP COUNT
function updateSignupCount (actionInstance) {
  functions.logger.info('🔢 Function started: updateSignupCount')

    let collection = ''

    switch(actionInstance.actionType) {
      case 'movement':
        collection = 'movements'
        break;
      case 'event':
        collection = 'calendar'
        break;
    }

    const signupCount = new Counter(db.collection(collection).doc(actionInstance.actionID), "signupCount")
    signupCount.incrementBy(1)
}

/* 👋 UPDATE USER PROFILE
The 'user profile' is stored in the 'users' collection.
*/
function updateUserProfile (actionInstance) {
  functions.logger.info('👋 Function started: updateUserProfile')

  if(actionInstance.actionType === 'movement') {
    // Add movement to personal user profile
    const userProfileRef = db.collection('users').doc(actionInstance.userID)

    userProfileRef.set({
      movements: FieldValue.arrayUnion(actionInstance.movementID)
    }, {merge: true}).catch((error) => {
        functions.logger.error('Error in updateUserProfile function', error)
    })
  }
}

/* 🌊 UPDATE MEMBERS PROFILE
The 'members profile' is stored as a subcollection of a specific movement.
*/
function updateMemberProfile (actionInstance) {
  functions.logger.info('🌊 Function started: updateMemberProfile')

  const memberProfileRef = db.collection('movements').doc(actionInstance.movementID).collection('userProfiles').doc(actionInstance.userID)

  let dataForMemberProfile = {}

  switch(actionInstance.actionType) {
      case 'movement':
        dataForMemberProfile = {
            member: true,
            timestampLastAction: FieldValue.serverTimestamp()
        }
        break;
      case 'event':
        dataForMemberProfile = {
            eventSignups: FieldValue.arrayUnion(actionInstance.actionID),
            timestampLastAction: FieldValue.serverTimestamp()
        }
        break;
  }

  // Update the members profile
  memberProfileRef.set(dataForMemberProfile, {merge: true}).catch((error) => {
    functions.logger.error('Error in updateMemberProfile function', error)
  })
}
