const functions = require('firebase-functions');

// const cors = require('cors')({
//   origin: true
// });

// https://cloud.google.com/appengine/docs/standard/go/reference/request-response-headers#app_engine-specific_headers
exports.getLocation = functions.region('europe-west1').https.onCall((data, context) => {

  functions.logger.info('getLocation rawRequest', context.rawRequest)

  return context.rawRequest.headers

  // cors(req, res, () => {

  //   const response = {
  //     "city": req.headers['X-Appengine-City'],
  //     "country": req.headers['X-Appengine-Country'],
  //     "CityLatLong": req.headers['X-Appengine-CityLatLong']
  //   }
  //   res.status(200).send(response);
  //   functions.logger.log('Sending location:', response);
  // })

});
