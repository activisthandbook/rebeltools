// ⬇️ IMPORTS
const functions = require('firebase-functions')
const admin = require('firebase-admin');

// ⏺  DEFINE CONSTANTS
const db = admin.firestore();

// 🔥 FIRESTORE TRIGGER
exports.onUserUpdate = functions.region('europe-west1').firestore
  .document('users/{userId}')
  .onUpdate((change) => {
    functions.logger.info('🔥 Firestore triggered: user updated', change.after.data())

    // Get an object representing the document
    const userData = change.after.data()

    // UPDATE ACTIONS
    updateMemberProfile(userData)

    return 0
  })

/* 🌊 UPDATE MEMBERS PROFILE
The 'members profile' is stored as a subcollection of a specific movement.
*/
function updateMemberProfile (userData) {
  functions.logger.info('🔵 Function started: updateMemberProfile', userData)

  if(userData.movements[0]) {
    userData.movements.forEach(movementID => {
      const memberProfileRef = db.collection('movements').doc(movementID).collection('members').doc(userData.id)

      let updatedMemberProfile = {}

      // We don't want to share everything from the user document, so we only share the data relevant for their profile.
      if (userData.emailAddress) updatedMemberProfile.emailAddress = userData.emailAddress
      if (userData.phoneNumber) updatedMemberProfile.phoneNumber = userData.phoneNumber
      if (userData.firstName) updatedMemberProfile.firstName = userData.firstName
      if (userData.lastName) updatedMemberProfile.firstName = userData.lastName

      memberProfileRef.set(updatedMemberProfile, {merge: true}).then(() => {
        functions.logger.error('🟢 Setting member profile succesful', updatedMemberProfile)
      }).catch((error) => {
        functions.logger.error('🔴 Failed to set member profile', error)
      })

    })
  }

}
