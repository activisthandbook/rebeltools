// ⬇️ IMPORTS
const functions = require('firebase-functions')
const admin = require('firebase-admin');

// ⏺  DEFINE CONSTANTS
const db = admin.firestore()
const FieldValue = admin.firestore.FieldValue;

exports.onAuthCreate = functions.region('europe-west1').auth.user().onCreate((user) => {
  functions.logger.info('🛡 Auth triggered: user created', user)

  const userProfileRef = db.collection('users').doc(user.uid)

  if (user.email) {
    userProfileRef.set({
      emailAddress: user.email,
      timestampCreated: FieldValue.serverTimestamp(),
      timestampLastUpdated: FieldValue.serverTimestamp()
    }).catch((error) => {
        functions.logger.error('Error in setting user data', error)
    })
  }

  return 0
});
