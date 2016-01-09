/*
 * Copyright 2016 University of Michigan-Dearborn
 * Learning about how Amazon S3 and experiment on how to automate sending files to S3 using nodejs.
**/

// Version History
// 2016-01-09, v0.1, initial coding, C. Che


var walkSync = function(dir, filelist) {
  // Required package and input for aws S3 
  var AWS = require('aws-sdk');

  // list all files in a directory
  var fs = fs || require('fs'),
  files = fs.readdirSync(dir);
  files.forEach(function(file) {
    // recursively search for all files
    if (fs.statSync(dir + '/' + file).isDirectory()) {
        filelist = walkSync(dir + file + '/', filelist);
    }
    else {
	console.log("uploading the following files to aws S3 under bucket: $bucketName");
	console.log(dir + "/" +file);

        //Create a bucket and upload and upload each file in the folder: $dir
	var keyName = dir + "/" + file;
  	var s3 = new AWS.S3({params: {Bucket: bucketName, Key: keyName}});
	var filebody = fs.createReadStream(keyName);
 	s3.upload({Body:filebody}).on('httpUploadProgress',function(evt) { console.log(evt); }).send (function(err,data) { console.log(err,data) });
    }
  });
  return filelist;
};


// files in this folder will be send to aws S3
var dir = "send-to-s3";

// files will be sent to this bucket
var bucketName = 'che-desktop';

// excute the main function
var filelist = walkSync(dir,filelist);

