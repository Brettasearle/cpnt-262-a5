const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const dbSeed = require(`./seeds/objects.js`);
const Object = require(`./models/object.js`);
mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true,useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`connection error:${error.message}`)
});

db.once('open', function() {
  console.log('Connected to DB...');
});
Object.insertMany(dbSeed,function(error,object){
  console.log('data import completed')
  mongoose.connection.close();
});