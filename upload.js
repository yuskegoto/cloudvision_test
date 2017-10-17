// Copyright 2015, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License")
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
// var api_key = API_KEY;
var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + api_key;


$(function () {
  $('#fileform').on('submit', uploadFiles);
});

/**
 * 'submit' event handler - reads the image bytes and sends it to the Cloud
 * Vision API.
 */
//function uploadFiles (event) {
//  event.stopPropagation();
//  event.preventDefault(); // Prevent the default form post
function uploadFiles () {
  console.log("uploading")

  var reader = new FileReader();
  reader.onloadend = processFile;

  //Grabbing video frame from canvas
   var file = document.getElementById("canvas");
   file.toBlob(function(blob){
       reader.readAsDataURL(blob);

/***** below is test for grabbing video frame**********************/
      //  var newImg = document.createElement('img'),
      //     url = URL.createObjectURL(blob);
      //  newImg.onload = function(){
      //      URL.revokeObjectURL(URL);
      //  };
      //  newImg.src = url;
      //  document.body.appendChild(newImg);
   }, 'image/jpeg', 0.8);   // uploaded picture must be jpeg
}

/**
 * Event handler for a file's data url - extract the image data and pass it off.
 */
function processFile (event) {
  var content = event.target.result;
  sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

/**
 * Sends the given file contents to the Cloud Vision API and outputs the
 * results.
 */
function sendFileToCloudVision (content) {

  var type = $('#fileform [name=type]').val();

  // Requet form for uploading
  var request = {
    requests: [{
      image: {
        content: content
      },
      features: [{
        type: type,
        maxResults: 4
      }]
    }]
  };

  //uploading indication
  var descriptionsNow = $('#results').text();
  descriptionsNow += " ...";
  $('#results').text(descriptionsNow);

  $.post({
    url: CV_URL,
    data: JSON.stringify(request),
    contentType: 'application/json'
  }).fail(function (jqXHR, textStatus, errorThrown) {
    $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
  }).done(displayJSON);

}

/**
 * Displays the results.
 */
function displayJSON (data) {
  var contents = JSON.stringify(data, null, 4);
  var annotationCounts = Object.keys(data.responses[0].labelAnnotations).length;

  // extract descriptions
  var descriptions = "";
  for (var i = 0 ; i < annotationCounts; i ++){
    descriptions += JSON.stringify(data.responses[0].labelAnnotations[i].description);
    if (i < annotationCounts - 1){
      descriptions += " / ";
    }
  }
  descriptions = descriptions.replace(/"/g, "");    //remove " from the string

  // console.log(contents);
  $('#results').text(descriptions);
  var evt = new Event('results-displayed');
  evt.results = contents;
  document.dispatchEvent(evt);
}
