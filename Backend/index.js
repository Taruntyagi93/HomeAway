
const express = require("express");
const app = express();
var mysql = require('mysql');

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const routes = require("./Router/route");
const db = require("./config/db");
var cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  const port = 3031;

  app.use(bodyParser.json())
 
  //Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  //use express session to maintain session data
app.use(session({
  secret              : 'cmpe273_kafka_passport_mongo',
  resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration            : 60 * 60 * 1000000000000000000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration      :  5 * 60 * 1000000000000000000
}));

app.use(cookieParser());
  
  app.use("/",routes.Login);
  //app.use("/")
  app.listen(port);
  console.log("Server running on "+ port);
  