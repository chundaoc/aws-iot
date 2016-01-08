var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
  files = fs.readdirSync(dir);
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
        filelist = walkSync(dir + file + '/', filelist);
    }
    else {
	console.log(dir + "/" +file);
    }
  });
  return filelist;
};


var dir = "./";
var filelist = [];
var test = walkSync(dir,filelist);

test = ["a","b","c"];
walkSync.forEach(function(file) {
	console.log(">>>>>> " +file);
});

