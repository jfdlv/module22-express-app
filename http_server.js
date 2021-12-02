// add http server
// -----------------------
// YOUR CODE
const express = require('express');
const app = express();
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);
const cors = require('cors');

app.use(cors());

// configure express to serve static files from public directory
// ------------------------------------------------------------------
app.use(express.static('public'));

// init the data store
db.defaults({ users: []}).write();

// data parser - user to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//return all users
app.get('/data', function(req, res) {
    res.send(db.get('users').value());
});

app.get('/accounts', function(req, res) {
    res.send(db.get('users').value());
});

app.post('/test', function(req,res){
    console.log(req.body.username, req.body.password);
    res.send(req.body.username + " " + req.body.password);
})

app.post('/add',function(req,res){
    var user = {
        'name': req.body.name,
        'dob': req.body.dob,
        'email': req.body.email,
        'username': req.body.username,
        'password': req.body.password,
        'phone': req.body.phone,
        'streetaddress': req.body.streetaddress,
        'citystatezip': req.body.citystatezip,
        'latitude': req.body.latitude,
        'longitude': req.body.longitude,
        'avatar': req.body.avatar
    }
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
})

app.post('/accounts',function(req,res){
    var user = {
        'name': req.body.name,
        'dob': req.body.dob,
        'email': req.body.email,
        'username': req.body.username,
        'password': req.body.password,
        'phone': req.body.phone,
        'streetaddress': req.body.streetaddress,
        'citystatezip': req.body.citystatezip,
        'latitude': req.body.latitude,
        'longitude': req.body.longitude,
        'avatar': req.body.avatar
    }
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
})

// start server
// -----------------------
app.listen(process.env.PORT || 3000, function(){
    console.log('Running on port 3000');
  })