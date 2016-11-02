// ==============================================
// Nothing to be change below this line
// ==============================================
let mongodb = require('mongodb');
let randomProfile = require('random-profile-generator');
let randomExt = require('random-ext');
let Client = require('node-rest-client').Client;



//We need to work with "MongoClient" interface in order to connect to a mongodb server.
let MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
let url = 'mongodb://localhost:27017/rocketbiller';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    let customers = db.collection('customers');
    let cards = db.collection('cards');

    customers.find({},{full_name:1, gateway_customer_id:1, gateway:1, user:1}).toArray(function(err, docs) {
      // assert.equal(err, null);
      
      // console.log("Found the following records");
      docs.map(doc => {
        let newCard = {
          "gateway" : null,
          "user" : null,
          "customer" : null,
          "gateway_customer_id" : null,
          "expiration" : {
            "month" : 12,
            "year" : 2020
          },
          "billing" : {
            "name" : "Mike Cuevas",
            "address_1" : "123 ST",
            "city" : "SAN JOSE",
            "state" : "CA",
            "zip_code" : 90210
          },
          "gateway_card_id" : "card_19B2lPG7xK7nmu5cWlVMIT6h",
          "last4" : "4242"
        };
        newCard.gateway = doc.gateway;
        newCard.user = doc.user;
        newCard.customer = doc._id;
        newCard.gateway_customer_id = doc.gateway_customer_id;
        
        cards.insert(newCard, function (err, result) {
          if (err) {
            console.log(err);
          }
        });
        
      });
      //Close connection
      db.close();
    });
  }
});