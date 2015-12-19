var mongoosastic = require('mongoosastic'),
    config = require('../config/config'),
    Package = require('../models/package').Package;


/* =============================================
* GET all packages
* =========================================== */
exports.getAllPackages = function(callback) {
  var getAllPackages = {
      "query" : {
        "match_all" : {}
      }
    };

  Package.search(getAllPackages, {size: 50000, hydrate:true, hydrateOptions: {lean: false}}, function(err, searchresult) {
    if(err){
      console.log(err);
    } else {
      callback(null, searchresult.hits.hits);
    }
  });
};

/* =============================================
* GET Package by name
* =========================================== */
exports.getPackageByName = function(name, callback) {
  var getPackageByName = {
    "bool": {
       "must":
          {
            "match": {"name": name}
          }
      }
    };

  Package.search(getPackageByName, {hydrate:true, hydrateOptions: {lean: false}}, function(err, searchresult) {
    if(err){
      console.log(err);
    } else {
      callback(null, searchresult.hits.hits);
    }
  });
};


/* =============================================
* GET Package by ID
* =========================================== */
exports.getPackageByID = function(id, callback) {
  var getPackageByID = {
    "bool": {
       "must":
          {
            "match": {"_id": id}
          }
      }
    };

  Package.search(getPackageByID, {hydrate:true, hydrateOptions: {lean: false}}, function(err, searchresult) {
    if(err){
      console.log(err);
    } else {
      callback(null, searchresult.hits.hits);
    }
  });
};


/* =============================================
* GET search for packages
* =========================================== */
exports.searchForPackages = function(callback) {
  var publicFilter = {
  "bool": {
     "must": [{
          "term": { "public": true}},
        {
        "multi_match" : {
          "query": search,
          "type": "best_fields",
          "fields": ["name", "language", "tags", "info"],
          "minimum_should_match": "25%",
          "fuzziness" : 2,
        }
      }],
     "must_not": { "term": { "public": false }}
  }
}

  Package.search(getAllPackages, {size: 50000, hydrate:true, hydrateOptions: {lean: false}}, function(err, searchresult) {
    if(err){
      console.log(err);
    } else {
      callback(null, searchresult.hits.hits);
    }
  });
};

