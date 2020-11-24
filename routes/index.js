var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var Twitter = require('twitter-lite');

const client = new Twitter({
  consumer_key:         '3OjuXY7YgfkSAuUFKo3fF9BpK',
  consumer_secret:      'CY3Y4ucCPotPOacC9NfFS5pjuSnuZPqEdNoR19fly50aDHKEt6',
  access_token_key:         '1331042940274282497-8YCN2dqLDEDUTk6se4fXMhL6mrf8SR',
  access_token_secret:  'zp0oQssIGLfYjwMhFA43vO1DQhi8xLf6UvJ9WLyaOoRBi'
})

router.get('/share', function (req, res) {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    var imageUrl = "https://og-image-main-2.vercel.app/" + encodeURI(req.query.text) + "?images=" + req.query.img + "&widths=" + req.query.name + "&heights=@" + req.query.username;
    res.render('share', {
        title: decodeURIComponent(req.query.title),
        img: decodeURIComponent(imageUrl),
        text: decodeURIComponent(req.query.text),
        url: decodeURIComponent(req.query.url)
    });


	fetch("https://graph.facebook.com/?id=" + fullUrl + "&access_token=794181571428980|2s39Nt9glu0SESvtCuTitLuHqIY&scrape=true", {
	 "method": "POST"
	}).then((response) => console.log(response));


    client.post('statuses/update', { status: fullUrl }).then(result => {
	  console.log('You successfully tweeted this : "' + result.text + '"');
	}).catch(console.error);

});

module.exports = router;
