// ⬇️ IMPORTS
const functions = require('firebase-functions')
const admin = require('firebase-admin');

// ⏺  DEFINE CONSTANTS
const db = admin.firestore();
const Counter = require("../distributed_counter")
const FieldValue = admin.firestore.FieldValue;

// 🔥 FIRESTORE TRIGGER
exports.onActionCreate = functions.region('europe-west1').firestore
  .document('actions/{actionId}')
  .onCreate((snap) => {
    functions.logger.info('🔥 Firestore triggered: action created', snap.data())

    // Get an object representing the document
    const actionInstance = snap.data()

    // UPDATE ACTIONS
    updateSignupCount(actionInstance)
    updateUserProfile(actionInstance)
    updateMemberProfile(actionInstance)

    return 0
  })

// 🔢 UPDATE SIGNUP COUNT
function updateSignupCount (actionInstance) {
  functions.logger.info('🔵 Function started: updateSignupCount', actionInstance)

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
  functions.logger.info('🔵 Function started: updateUserProfile', actionInstance)

  if(actionInstance.actionType === 'movement') {
    // Add movement to personal user profile
    const userProfileRef = db.collection('users').doc(actionInstance.userID)

    const userProfileData = {
      movements: FieldValue.arrayUnion(actionInstance.movementID)
    }

    userProfileRef.set(userProfileData, {merge: true}).then(() => {
      functions.logger.info('🟢 Setting user profile succesful', userProfileData)
    }).catch((error) => {
        functions.logger.error('🔴 Error in updateUserProfile function', error)
    })
  }
}

/* 🌊 UPDATE MEMBERS PROFILE
The 'members profile' is stored as a subcollection of a specific movement.
*/
function updateMemberProfile (actionInstance) {
  functions.logger.info('🔵 Function started: updateMemberProfile', actionInstance)

  const userProfileRef = db.collection('users').doc(actionInstance.userID)
  const memberProfileRef = db.collection('movements').doc(actionInstance.movementID).collection('members').doc(actionInstance.userID)

  userProfileRef.get().then(doc => {
    functions.logger.info('🟢 Fetching user profile succesful', doc)

    let dataForMemberProfile = {}

    if (doc.exists) {
      const user = doc.data()
      if (user.emailAddress) dataForMemberProfile.emailAddress = user.emailAddress
      if (user.phoneNumber) dataForMemberProfile.phoneNumber = user.phoneNumber
      if (user.firstName) dataForMemberProfile.firstName = user.firstName
      if (user.lastName) dataForMemberProfile.firstName = user.lastName
    }
    dataForMemberProfile.timestampLastAction = FieldValue.serverTimestamp()

    switch(actionInstance.actionType) {
        case 'movement':
          dataForMemberProfile.member = true
          break;
        case 'event':
          dataForMemberProfile.eventSignups = FieldValue.arrayUnion(actionInstance.actionID)
          break;
    }

    // Update the members profile

    memberProfileRef.set(dataForMemberProfile, {merge: true}).then(() => {
      functions.logger.info('🟢 Setting member profile succesful', dataForMemberProfile)
    }).catch((error) => {
      functions.logger.error('🔴 Error in updateMemberProfile function', error)
    })

  }).catch(error => {
    functions.logger.error('🔴 Error in ferching user profile', error)
  })
}
