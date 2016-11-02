// // import phantom from 'phantom';
let phantom = require("phantom");
let sitepage;
let phInstance;
phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        return page.open('http://localhost:5000/');
    })
    .then(status => {
        console.log(status);
        // return sitepage.property('content');
          if (status !== 'success') {
            console.log('Unable to access network');
          } else {
            sitepage.evaluate(function() {
              console.log("adasdas");
              // return "test"
              // console.log(document.getElementById('token'));
              setTimeout(function(){
                console.log(document.getElementById('token'));
                return document.getElementById('token');
              }, 2000);
              

            }).then(function(success){
              console.log(success);
            });
            // console.log("status", status);
            
          }
          // phantom.exit();

    })
    .then(content => {
        console.log(content);
        sitepage.close();
        phInstance.exit();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });

// var webPage = require('webpage');
// var page = webPage.create();
// console.log('The default user agent is ' + page.settings.userAgent);
// page.settings.userAgent = 'SpecialAgent';
// page.open('http://www.httpuseragent.org', function(status) {
//   if (status !== 'success') {
//     console.log('Unable to access network');
//   } else {
//     var ua = page.evaluate(function() {
//       return document.getElementById('myagent').textContent;
//     });
//     console.log(ua);
//   }
//   phantom.exit();
// });