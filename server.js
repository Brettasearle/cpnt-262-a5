const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const gods = require('./models/object.js');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true,useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', function(error){
  console.log(`connection error:${error.message}`)
});

db.once('open', function() {
  console.log('Connected to DB...');
});



app.get('/', function(req, res) {
  res.send('<h1>Copy this endpoint</h1> <p>/api/v0/objects</p><p>/api/v0/objects/id</p><p>id must be 1-14</p>');
})

app.get('/api/v0/objects', function(req, res) {
  gods.find({},function(error,data){
    if(error){
      res.send('Could not find the gods');
    }else{res.json(data);}
  });
})

app.get('/api/v0/objects/:id', function(req, res)
{let godId=req.params.id;
gods.findOne({id:godId},function(error,data){
  if(error|| data===null){
    res.send('God not found');
    console.log(error);
  }else{
    res.json(data);}
});
})

app.use(function(req, res) {
  res.status(404);
  res.send('404: File Not Found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});