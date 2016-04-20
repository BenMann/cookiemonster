var config = require('../config/config'),
    api = config.apiPath;

var Falcor = require('falcor'),
    FalcorDataSource = require('falcor-http-datasource'),
    model = new Falcor.Model({
        source: new FalcorDataSource(config.apiPath)
    })

module.exports = model
