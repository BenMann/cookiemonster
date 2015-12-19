var mongoosastic = require('mongoosastic'),
    Package = require('../models/package').Package;


exports.init = function(packages, callback) {
  packages.forEach(function(package, index) {
    var newPackage = new Package({
      name: package.name,
      url: package.url
    });

    newPackage.save(function(err){
      if(err){
        console.log("failed saving package: "+err);
      }
      callback(null, "package "+index+" saved...");
    });
  });
};

