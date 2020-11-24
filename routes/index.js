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

function pingFacebook(url) {
	fetch("https://graph.facebook.com/?id=" + url + "&access_token=1080871795681184|vSczxR3F0wmrecaaHtWtlOOe3AE&scrape=true", {
		 "method": "POST"
		}).then((response) => console.log(response));
}

function pingTwitter(url) {
	client.post('statuses/update', { status: url }).then(result => {
	  console.log('You successfully tweeted this : "' + result.text + '"');
	}).catch(console.error);
}

    

router.get('/share', function (req, res) {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.replace('&ping', '');
    console.log(fullUrl);
    var imageUrl = "https://og-image-main-2.vercel.app/" + encodeURI(req.query.text) + "?images=" + req.query.img + "&widths=" + req.query.name + "&heights=@" + req.query.username;
    
if (req.query.ping) {
    pingTwitter(fullUrl);
   	pingFacebook(fullUrl);
   }

    res.render('share', {
        title: decodeURIComponent(req.query.title),
        img: decodeURIComponent(imageUrl),
        text: decodeURIComponent(req.query.text),
        url: decodeURIComponent(req.query.url)
    })

  


	

});

module.exports = router;
