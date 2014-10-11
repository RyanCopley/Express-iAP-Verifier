//Configure these
var client = new IAPVerifier("blahblah");
var appBundles = ["com.something.something"];

var express = require('express');
var app = express();
var IAPVerifier = require('iap_verifier');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );


app.post('/validate', function(req, res){
	if (typeof req.body.receipt !== 'undefined'){
		var receiptData = req.body.receipt.receipt;
		var bundleId = req.body.receipt.bundleId;
		if (appBundles.indexOf(bundleId) != -1){
			client.verifyReceipt(req.body.receipt, function(valid, msg, data) {
				res.json({valid:valid});
			});
		}else{
			res.json({valid:false});
		}
	}else{
		res.json({valid:false});
	}
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
