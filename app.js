var express = require('express');
var app = express();
var IAPVerifier = require('iap_verifier');

var client = new IAPVerifier("blahblah");

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies

app.get('/validate', function(req, res){
	if (typeof req.body.receipt !== 'undefined'){
		client.verifyReceipt(req.body.receipt, function(valid, msg, data) {
			res.json({valid:valid});
		});
	}else{
		res.json({valid:false});
	}
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
