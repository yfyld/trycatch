const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/status', function internalStaus(req, res){
    res.send('API server running.');
  });
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send(200);
  });
  
  app.get('/get/200', function(req, res){
     
    setTimeout(() => {
        res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
        res.status(200);
        res.send('{"a":1}');
    }, 10000)
    
  });
  app.post('/post/200', function(req, res){
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.send('{"a":1}');
  });
  app.get('/get/400', function(req, res){
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'text/plain');
    res.status(400);
    res.send('"参数错误"');
  });
  app.post('/post/400', function(req, res){
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'text/plain');
    res.status(200);
    res.send('参数错误');
  });
  app.post('/post/500', function(req, res){
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'text/plain');
    res.status(200);
    res.send('"服务器错误"');
  });
  app.get('/get/500', function(req, res){
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'text/plain');
    res.status(200);
    res.send('"服务器错误 "');
  });
  app.get('/error', function(req, res){
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    res.status(504);
    res.send('{}');
  });
  
  

app.listen(5555, function() {
    console.log('listening');
})