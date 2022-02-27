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

    functions.logger.info(actionInstance, { structuredData: true })

    if(actionInstance.actionType === 'event') {

      const signupCount = new Counter(db.collection("events").doc(actionInstance.actionID), "signupCount")

      // Increment the field "visits" of the document "pages/hello-world".
      signupCount.incrementBy(1);

      functions.logger.info('Incremented!!')

    }

  })
