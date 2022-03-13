const functions = require('firebase-functions');

// const cors = require('cors')({
//   origin: true
// });

// https://cloud.google.com/appengine/docs/standard/go/reference/request-response-headers#app_engine-specific_headers
exports.getLocation = functions.region('europe-west1').https.onCall((data, context) => {

  functions.logger.info('🧭 getLocation rawRequest', context.rawRequest.headers)

  const response = {
    "city": context.rawRequest.headers['x-appengine-city'],
    "country": context.rawRequest.headers['x-appengine-country'],
    "lat": Number(context.rawRequest.headers['x-appengine-citylatlong'].split(',')[0]),
    "long": Number(context.rawRequest.headers['x-appengine-citylatlong'].split(',')[1])
  }

  return response

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
