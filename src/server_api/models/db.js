var mongoose = require('mongoose');
require('./stations');
require('./persons');
require('./actions');
require('./roles');
require('./trackers');
var dbURI = 'mongodb://hgss:hgss123@192.168.201.46:27017/hgss';
if (process.env.NODE_ENV === 'production'){
  dbURI = 'mongodb://hgss:hgss123@127.0.0.1:27017/hgss';
}

// Connect to the DB
// if there is more db's:
// var mainDB = mongoose.createConnection(dbURI);
// mainDB.on('connected', ...)
mongoose.connect(dbURI);

mongoose.connection.collections['people'].ensureIndex({"address.coords":"2dsphere"});

mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});

var shutdownDB = function(msg, callback){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', function(){
  shutdownDB('nodemon restart', function(){
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', function(){
  shutdownDB('app termination', function(){
    process.exit(0);
  });
});

// For Heroku app termination
process.on('SIGTERM', function(){
  shutdownDB('Heroku app shutdown', function(){
    process.exit(0);
  });
});
