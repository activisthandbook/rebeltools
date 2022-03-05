const functions = require('firebase-functions');

const cors = require('cors')({
  origin: true
});

// https://cloud.google.com/appengine/docs/standard/go/reference/request-response-headers#app_engine-specific_headers
exports.getLocation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.status(200).send({
      "data": {
        "city": req.headers['X-Appengine-City'],
        "country": req.headers['X-Appengine-Country'],
        "lat": req.headers['X-Appengine-CityLatLong'].split(',')[0],
        "lgn": req.headers['X-Appengine-CityLatLong'].split(',')[1]
      }
    });
    res.end();
  })
});
