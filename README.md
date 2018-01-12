Google Cloud Vision API Client Side JS demo for apd
by: Yuske Goto

You can check out this demo <a href="http://apd.yuskegoto.de/cloudvision/index.html">here</a>

Based on th client side JS demo by Terrence Ryan
http://terrenceryan.com/blog/index.php/working-with-cloud-vision-api-from-javascript/


This directory contains [Cloud Vision API](https://cloud.google.com/vision/) Client Side JS samples.

## Prerequisites
1. [Sign up for Google Cloud Platform Account](http://cloud.google.com)
2. [Enable Cloud Vision API](https://cloud.google.com/vision/docs/getting-started)
3. [Create a Browser Key](https://cloud.google.com/vision/docs/auth-template/cloud-api-auth) for making calls to Cloud Vision API

## Setup
1. Rename the file *key.js.example* to *key.js*.
2. Update the line `var apiKey = 'YOUR API KEY HERE';` in *key.js* with your API key.
3. Start a web server in the sample folder and navigate to index.html.


From here, the demo allows you to upload images and process them using the various [Cloud Vision API annotation types](https://cloud.google.com/vision/reference/rest/v1/images/annotate#Type).

## About additional cam picture taking
1. Uploading works only with jpeg, base64 encoded picture.
