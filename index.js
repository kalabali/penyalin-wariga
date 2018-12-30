const cron = require('node-cron');
const db = require('./src/helpers/db');

db.connect((err) => {
  if(err){
    console.log(err);
    console.log('unable to connect to database');
  }
  else{
    console.log('connected to database');
    db.disconnect();
  }
});

// cron.schedule('* * * * *', () => {
//     console.log(`running at ${Date()}`);
// });