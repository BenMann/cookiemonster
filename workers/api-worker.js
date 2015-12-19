var request = require('request'),
    config = require('../config/config'),
    api = config.apiPath;

/* =============================================
* GET general registry info
* =========================================== */
exports.getRegistryInfo = function(callback) {
  doRequest(api, function(err, res){
    if(err){
      console.log(err);
    }
    callback(null, res);
  });
};


exports.searchPackage = function(query, callback) {
  var searchURL = api+'packages/search/'+query;

  doRequest(searchURL, function(err, res){
    if(err){
      console.log(err);
    }
    callback(null, res);
  });
};



// TODO: put them somewhere else..

/* =============================================
* HELPER FUNCTIONS
* =========================================== */

var request = request.defaults({json: true})

function doRequest(url, callback){
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      if (typeof body !== 'object') {
        console.log('Response of request to ' + api + ' is not valid json');
      }
      callback(null, body);
    };
  });
};