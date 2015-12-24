var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
  	"host": "A9G4M9UKUT88L.iot.us-west-2.amazonaws.com",
	"port": 8883,
	"clientId": "myTest",
	"thingName": "myTest",
	"caCert": "../.ssh/aws-root-CA.pem",
	"clientCert": "../.ssh/f9a46c2a28-certificate.pem.crt",
	"privateKey": "../.ssh/f9a46c2a28-private.pem.key",
	"Region": "us-west-2"
});

device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('topic/test');
    device.publish('topic/test', JSON.stringify({ test_data: 1}));
    });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });


var thingShadows = awsIot.thingShadow({
        "clientId": "myTestId",
        "caCert": "../.ssh/aws-root-CA.pem",
        "clientCert": "../.ssh/f9a46c2a28-certificate.pem.crt",
        "privateKey": "../.ssh/f9a46c2a28-private.pem.key",
	"region": "us-west-2"
});

//
// Thing shadow state
//
var rgbLedLampState = {"state":{"desired":{"red":222,"green":333,"blue":555}}};

//
// Client token value returned from thingShadows.update() operation
//
var clientTokenUpdate;

thingShadows.on('connect', function() {
//
// After connecting to the AWS IoT platform, register interest in the
// Thing Shadow named 'myTest'.
//
    thingShadows.register( 'myTest' );
//
// 2 seconds after registering, update the Thing Shadow named 
// 'myTest' with the latest device state and save the clientToken
// so that we can correlate it with status or timeout events.
//
// Note that the delay is not required for subsequent updates; only
// the first update after a Thing Shadow registration using default
// parameters requires a delay.  See API documentation for the update
// method for more details.
//
    setTimeout( function() {
       clientTokenUpdate = thingShadows.update('myTest', rgbLedLampState  );
       }, 2000 );
    });

thingShadows.on('status', 
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
    });

thingShadows.on('delta', 
    function(thingName, stateObject) {
       console.log('received delta '+' on '+thingName+': '+
                   JSON.stringify(stateObject));
    });

thingShadows.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout '+' on '+operation+': '+
                   clientToken);
    });

