// ==============================================
// ==============================================
// IMPORTANT
// ==============================================
// Comment this block in models/subscription.js
// ==============================================
//104 if (start_date < today){
//105   err = new Error('Please choose a valid start date.');
//106 };
// ==============================================
// ==============================================

// ==============================================
// Get Token
// http://localhost:4000/users/api/token/refresh
// ==============================================
let token = "rb_live_7EUqOTuVjlfmWKk59jTxFm1OERe2vw2O"
// ==============================================
// Amount of records to be created
// ==============================================
var subscriptions = 1;

// ==============================================
// Nothing to be change below this line
// ==============================================
var moment = require('moment');
var Client = require('node-rest-client').Client;
var randomProfile = require('random-profile-generator');
var randomExt = require('random-ext');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/rocketbiller';

MongoClient.connect(url, function (err, db) {
  var plans = db.collection('plans');
  var customers = db.collection('customers');
  var cards = db.collection('cards');
  let counterClose = 0;
  for (var i = 0; i < subscriptions; i++) {
    plans.aggregate([ { $sample: { size: 1 } } ]).toArray(function(err, plan) {
      customers.aggregate([ { $sample: { size: 1 } } ]).toArray(function(err, customer) {
        cards.find({customer: customer[0]._id}).toArray(function(err, card) {
          let subscription = {
            plan: plan[0]._id,
            customer: customer[0]._id,
            card: card[0]._id,
            start_date: moment(randomExt.date(new Date(), new Date("01-Jan-2016 00:00:00 UTC"))).format("YYYY-MM-DD")
          }
          add({model: "subscriptions", data: subscription});          
          counterClose++;
          if( counterClose == subscriptions ){
            db.close();
          }
        });
      });
    });
  }
});

function add(options){
  let params = options || {};
  let model = params.model || null;
  let object = params.data || null;
  let url = `http://localhost:4000/api/${model}`;
  let client = new Client();
  let args = {
    data: object,
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token 
    }
  };
  client.post(url, args, function (data, response) {
    console.log(data);
  });
}
