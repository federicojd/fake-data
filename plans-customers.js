// ==============================================
// Get Token
// http://localhost:4000/users/api/token/refresh
// ==============================================
let token = "rb_live_VPoYAlGg7IBCsW2kZrvTE41gKsHpevxA"
// ==============================================
// Get Gateway ID from MongoDB
// db.gateways.find().pretty()
// ==============================================
let gateway = "583e57e2f8bb5be80fd87033"
// ==============================================
// Amount of records to be created
// ==============================================
let plans = 10;
let customers = 50;
// ==============================================

// ==============================================
// Nothing to be change below this line
// ==============================================
var randomProfile = require('random-profile-generator');
var randomExt = require('random-ext');
var moment = require('moment');
var Client = require('node-rest-client').Client;
// ==============================================

// ==============================================
// PLANS
// ==============================================
for (let i = 0; i < plans; i++) {
  let userId = //mongo object id for desired user *important
  let uniqueId = `fake${i}.`;
  let name = `Plan ${i}`;
  let invoiceName = `Plan ${i} invoice name`;
  let description = `Normally, both your asses would be dead as fucking fried chicken, 
  but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, 
  I wanna help you.`;
  var amount = randomExt.integer(300, 25);
  let plan = {
    user: userId,
    unique_id: uniqueId,
    name: name,
    invoice_name: invoiceName,
    billing:{
      display:{
        amount: amount
      }
    },
    description: description
  }
  add({model: "plans", data:plan});
}

// ==============================================
// CUSTOMER
// ==============================================

for (let i = 0; i < customers; i++) {
var name = randomProfile.name().split(" ");
var email = randomProfile.email();
let address = randomProfile.address().split(", ");
let state = address[2].split(" ")[0]
let zipCode = address[2].split(" ")[1]
let customer = {
    created_at: moment(randomExt.date(new Date(), new Date("01-Jan-2016 00:00:00 UTC"))).format("YYYY-MM-DD"),
    email: email,
    first_name: name[0],
    last_name: name[1],
    company: `RB${i}`,
    gateway: {
      _id: gateway,
      company: "stripe"
    },
    address       : {
      primary     : address[0],
      city        : address[1],
      state       : state,
      zip_code    : zipCode,
      country     : "US"
    }
  };
  add({model: "customers", data: customer});
}


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
    // console.log(data);
  });
}

// run 'node plans-customers' in terminal
