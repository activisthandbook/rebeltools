const admin = require('firebase-admin');

// 🔄 INITIALISATIONS
admin.initializeApp();

const onActionCreate = require('./firestore/onActionCreate')
const onAuthCreate = require('./firestore/onAuthCreate')
const onUserUpdate = require('./firestore/onUserUpdate')
const getLocation = require('./https/getLocation')

exports.onActionCreate = onActionCreate.onActionCreate
exports.onAuthCreate = onAuthCreate.onAuthCreate
exports.onUserUpdate = onUserUpdate.onUserUpdate
exports.getLocation = getLocation.getLocation
