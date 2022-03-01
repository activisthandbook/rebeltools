const admin = require('firebase-admin');

// 🔄 INITIALISATIONS
admin.initializeApp();

const onActionCreate = require('./firestore/onActionCreate')
const onAuthCreate = require('./firestore/onAuthCreate')

exports.onActionCreate = onActionCreate.onActionCreate
exports.onAuthCreate = onAuthCreate.onAuthCreate
