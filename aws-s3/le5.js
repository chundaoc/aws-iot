/*
 * Copyright 2016 University of Michigan-Dearborn
 * Learning about how Amazon S3 and experiment on how to automate sending files to S3 using nodejs.
**/

// Version History
// 2016-01-09, v0.1, initial coding, C. Che


// upload all files in a BUCKET_ROOT_FOLDER to a aws s3 bucket
var walkSync = function(dir, filelist) {
  	var fs = fs || require('fs'),
  files = fs.readdirSync(dir);
  files.forEach(function(file) {

  // recursively search for all files
  if (fs.statSync(dir + '/' + file).isDirectory()) {
	filelist = walkSync(dir + file + '/', filelist);
  }
  else {
	console.log("uploading the following files to aws S3 under bucket: $aws_s3_bucket_name");
	console.log(dir + "/" +file);

        //Create a bucket and upload and upload each file in the folder: $BUCKET_ROOT_FOLDER
	var keyName = dir + "/" + file;
	var filebody = fs.createReadStream(keyName);
	var x  = s3upload(s3Conf.BUCKET, keyName,filebody);
  }
  });

  return filelist;
};


var s3upload = function(bucket,key, body) {
  	var s3 = new s3Conf.AWS.S3({params: {Bucket: bucket, Key: key}});
 	s3.upload({Body:body}).on('httpUploadProgress',function(evt) { console.log(evt); }).send (function(err,data) { console.log(err,data) });

};	

// excute the main function
var s3Conf = require('./aws_s3_config');
var filelist = walkSync(s3Conf.BUCKET_ROOT_FOLDER,filelist);

