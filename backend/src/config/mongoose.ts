export { };
const mongoose = require('mongoose');
const { mongo, env } = require('./vars');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err: any) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  console.log(" mongo.uri", mongo.uri,mongo.user);
   
  mongoose.connect(
    mongo.uri,
    {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: mongo.user,
      pass: mongo.pass
    }
  ).then(() =>{
    console.log("data");
    
  }).catch((err:any) =>{
    console.log(err);
    
  });
  return mongoose.connection;
};
