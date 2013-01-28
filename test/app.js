var express = require('express');
var app = express();
var urlalias = require('../lib/index');
urlalias.configure('mysite')

urlalias.add('/alias1', '/hello');
urlalias.add('/alias2', '/foo');
urlalias.add('/alias3', '/bar', function(err) {console.log("add /alias3: " + err)});
urlalias.add('/alias3', '/bar', function(err) {console.log("add /alias3: " + err)});

urlalias.remove('/alias3', function(err) {console.log("remove /alias3: " + err)});
urlalias.remove('/foobar', function(err) {console.log("remove /foobar: " + err)});

urlalias.isExist('/alias2', function(err) {console.log("isExist /alias2: " + err)});
urlalias.isExist('/alias3', function(err) {console.log("isExist /alias3: " + err)});


app.use(urlalias);

app.get('/hello', function(req, res) {
  res.send('HELLO World');
});

app.get('/world', function(req, res) {
  res.send('Hello WORLD');
});

app.get('/foo', function(req, res) {
  res.send('FOO bar');
});

app.get('/bar', function(req, res) {
  res.send('foo BAR');
});

app.listen(8081);
console.log('Listening on port 8081');