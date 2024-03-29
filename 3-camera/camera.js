// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This camera example takes a picture. If a
directory is specified with the --upload-dir
flag, the picture is saved to that directory.
*********************************************/

var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port.A);


var notificationLED = tessel.led[3]; // Set up an LED to notify when we're taking a picture

// Wait for the camera module to say it's ready

camera.on('ready', function() {
    notificationLED.high();
    // Take the picture
setInterval( function(){
    camera.takePicture(function(err, image) {
      if (err) {
        console.log('error taking image', err);
      } else {
        notificationLED.low();
        // Name the image
        var name = 'picture-' + Date.now() + '.jpg';
        // Save the image
        console.log('Picture saving as', name, '...');
        process.sendfile(name, image);
        console.log('done.');
        // // Turn the camera off to end the script
        // camera.disable();
      }
  });
},5000);
});

setTimeout(function(){
camera.disable();
}, 20000);

camera.on('error', function(err) {
  console.error(err);
});
