var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var Twitter = require('twitter-lite');

const client = new Twitter({
  consumer_key:         '3OjuXY7YgfkSAuUFKo3fF9BpK',
  consumer_secret:      'CY3Y4ucCPotPOacC9NfFS5pjuSnuZPqEdNoR19fly50aDHKEt6',
  access_token:         '1331042940274282497-x4wK9j9WhbudtPvk0Sa3HBd8sSHEXM',
  access_token_secret:  '5NrukkaV9bwGiZ61zBVhGv1eE9dw6STLy3PQhVTFpz65e',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

router.get('/share', function (req, res) {

    // var url = req.protocol + '://' + req.get('host') + req.originalUrl; // points to this endpoint
    var imageUrl = "https://og-image-main-2.vercel.app/" + encodeURI(req.query.text) + "?images=" + req.query.img + "&widths=" + req.query.name + "&heights=@" + req.query.username;
    res.render('share', {
        title: decodeURIComponent(req.query.title),
        img: decodeURIComponent(imageUrl),
        text: decodeURIComponent(req.query.text),
        url: decodeURIComponent(req.query.url)
    });

    client
  .get("account/verify_credentials")
  .then(results => {
    console.log("results", results);
  })
  .catch(console.error);
  
    client.post('statuses/update', { status: 'Hello world!' }).then(result => {
	  console.log('You successfully tweeted this : "' + result.text + '"');
	}).catch(console.error);

});

module.exports = router;
