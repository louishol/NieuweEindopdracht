var express = require('express');
var router = express.Router();
var http = require("https");

router.get('/', function(req,res) {
	res.send("ok");
});
/* GET home page. */
router.get('/:lat/:lng', function(req, res, next) {

	var lat = req.params.lat;
	var lng = req.params.lng;

	var options = {
	  host: 'maps.googleapis.com',
	  path: "/maps/api/place/nearbysearch/json?key=AIzaSyBiRwy-lPEwPJkfOOG0XPpeT_OCG88Ust8&location=" + lat + ","+ lng + "&radius=5000&type=cafe",
	  method: 'GET',
	  headers: { 'Content-Type': 'application/json' }
	};
	getJSON(options,
		function(statusCode, result)
        {
            res.statusCode = statusCode;
            res.send(result);
        });
});

function getJSON(options, onResult)
{
	var req = http.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
}

module.exports = router;
