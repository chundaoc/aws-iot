var express = require("express");
var app = express();
app.get('/',function(req,res) {
  res.send(JSON.stringify(req.headers));
})
app.get('/test',function(req,res) {
  res.send(JSON.stringify(req.headers));
})
app.all('/test1',function(req,res,next) {
  res.send("<html>test1</html>");
  next();
})
app.get('/ab?cd',function(req,res) {
  res.send("<html>ab?cd</html>");
})
app.listen(5201);
