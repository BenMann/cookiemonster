var request = require('request'),
    config = require('../config/config'),
    api = config.apiPath,
    model = require('../model/model.js');

var jlog = function(x) { console.log(JSON.stringify(x, null, 3)); };

/* =============================================
* GET general registry info
* =========================================== */
exports.getRegistryInfo = function(callback) {
  model.get("registryInfo").then(function(response) {
    callback(null, response.json.registryInfo.name);
  });
};


/* =============================================
* POST search package
* =========================================== */
exports.searchPackage = function(packageName, callback) {
  model.get(["packages", packageName]).then(function(response) {
    var packages = response.json.packages[packageName];
    callback(null, packages);
  });
};
