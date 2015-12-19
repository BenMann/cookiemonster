var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    api = require('../workers/api-worker'),
    config = require('../config/config');


/* =============================================
* Displays main search site.
* =========================================== */
router.get('/', function(req, res, next) {
  api.getRegistryInfo(function(err, regInfo){
    res.render('index', {
      registryVersion: regInfo.version
    });
  });
});



/* =============================================
* POST search query for package
* =========================================== */
router.post('/search', function(req, res, next) {

  api.searchPackage(req.body.query, function(err, result){
    if(err){
      console.log(err);
    }

    res.render('searchresults', {
      query: req.body.query,
      packages: result
    });


  });
});


module.exports = router;