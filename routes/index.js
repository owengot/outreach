var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/share', function (req, res) {

    // var url = req.protocol + '://' + req.get('host') + req.originalUrl; // points to this endpoint
    var imageUrl = "https://og-image-main-2.vercel.app/" + encodeURI(req.query.text) + "?images=" + req.query.img + "&widths=" + req.query.name + "&heights=@" + req.query.username;
    res.render('share', {
        title: decodeURIComponent(req.query.title),
        img: decodeURIComponent(imageUrl),
        text: decodeURIComponent(req.query.text),
        url: decodeURIComponent(req.query.url)
    });

});

module.exports = router;
