var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const keySecret = "sk_test_51Hv4VPFkCQi6gy8wMgkOVAhkeMAt1J17PY4XWkGDCJdSmzMyresHkWo3nz6AiatwXWJFdqRo7sIfoCILlyiIbOWy00CR1LVWcR";
const keyPublishable = "pk_test_51Hv4VPFkCQi6gy8wWToK70luIgge0vD9mo40Q6Fge0hyV55L7l3n3iXJ5gAtyHzq5BEXAy5FyCtim27G1CxJvCqg00q6mnMLyh";
var cors = require('cors')

var corsOptions = {
  origin: 'https://anywhere.edgeryders.eu',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const stripe = require("stripe")(keySecret);

var bodyParser = require('body-parser')
router.use(require("body-parser").urlencoded({extended: false}));

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
	fetch("https://graph.facebook.com/?id=" + encodeURI(url) + "&access_token=1080871795681184|vSczxR3F0wmrecaaHtWtlOOe3AE&scrape=true", {
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

router.post("/pay", cors(corsOptions), function(req, res) => {
  let amount = req.body.amount;
  console.log(req.body);
stripe.customers.create({
  email: req.body.email,
  name: req.body.name,
  source: req.body.source // token for the card
  })
  .then(customer =>
  stripe.charges.create({ // charge the customer
  amount,
  description: req.body.description,
  currency: "eur",
  customer: customer.id
  })).then(charge => res.send(charge)).catch(error => res.send(error) );
});

module.exports = router;
