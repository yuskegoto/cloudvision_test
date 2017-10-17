// (function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;
  var videoStarted = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = null;
  var photo = null;
  var takebutton = null;

  // up frequency of uploading
  var upLoadCycle = 5000;

  function startup() {
    console.log("starting up");
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    // photo = document.getElementById('photo');
    takebutton = document.getElementById('takebutton');

    navigator.getUserMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia ||
                           navigator.mediaDevices.getUserMedia);

   window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

   if (navigator.getUserMedia){
     navigator.getUserMedia(
        {
          video: true,
          audio: false
        },
        function(stream) {
          this.stream = stream;
          if (navigator.mozCaptureStream) {
            video.mozSrcObject = stream;
          } else {
					  video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
          }
          // video.play();    //on mobile device user needs to intiate this action
        },
        function(err) {
          console.log("An error occured! " + err);
        }
      );

   }
   else {
     console.log("No getUserMedia.")
   }

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(height)) {
          height = width / (4/3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
        console.log("width: " + width + " height: "+ height);
      }
    }, false);

    // Event listener for start uploading
    // takebutton.addEventListener('click', function(ev){
    //   toggleShooting();
    //   ev.preventDefault();
    // }, false);

  }

  function startVideo(){
    video = document.getElementById('video');
    video.play();
    console.log("video started");
    videoStarted = true;
  }

  function takeUpload(){
    takepicture();
    uploadFiles();
  }

  var shooting = false;

  function toggleShooting(){
    if (shooting == false){
      setIntervalShooting();
    }
    else{
      stopIntervalShooting();
    }
  }

  // Container for Interval uploading function
  var intervalShot;

  function setIntervalShooting(){
    if (!videoStarted) startVideo();

    console.log("interval set");
    intervalShot = setInterval(function(){takeUpload()},upLoadCycle);    // Uploading function fired in every 5 seconds, not including uploading time
    shooting = true;
    $("#takebutton").html('Stop');
    takeUpload();
  }

  function stopIntervalShooting(){
    console.log("interval release");
    clearInterval(intervalShot);
    shooting = false;
    $("#takebutton").html('Start');
    $('#results').text('Click button to start');
  }

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      // var data = canvas.toDataURL('image/jpeg');
    } else {
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
// })();
