const functions = require('firebase-functions')

 // Initialize Firebase.
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const Counter = require("./distributed_counter")

exports.logAction = functions.region('europe-west1').firestore
  .document('actions/{actionId}')
  .onCreate((snap) => {
    // Get an object representing the document
    const actionInstance = snap.data()

    // UPDATE SIGNUP COUNT
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

    // UPDATE USER & MOVEMENT MEMBER PROFILE
    const userProfileRef = db.collection('users').doc(actionInstance.userID)
    const memberProfileRef = db.collection('movements').doc(actionInstance.movementID).collection('userProfiles').doc(actionInstance.userID)

    let dataForMemberProfile = {}

    switch(actionInstance.actionType) {
        case 'movement':
          dataForMemberProfile = {
              member: true,
              timestampLastAction: db.FieldValue.serverTimestamp()
          }

          // Add movement to personal user profile
          userProfileRef.set({
            movements: db.FieldValue.arrayUnion(actionInstance.movementID)
          }, {merge: true})

          break;
        case 'event':
          dataForMemberProfile = {
              eventSignups: db.FieldValue.arrayUnion(actionInstance.actionID),
              timestampLastAction: db.FieldValue.serverTimestamp()
          }
          break;
    }

    // Update the members profile
    memberProfileRef.set(dataForMemberProfile, {merge: true})
  })
