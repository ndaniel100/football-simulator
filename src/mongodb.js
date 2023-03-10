var request = require('request-promise');
var config = require("./config.json");

(async() => {
    var options = {
    'method': 'POST',
    'url': `https://data.mongodb-api.com/app/data-${config.dataID}/endpoint/data/v1/action/find`,
    'headers': {
        'api-key': config.apikey,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "collection": "TeamsList",
        "database": "WC_Teams",
        "dataSource": "ndaniel10"
    }),
    };
    var response = await request(options)
    exports.teamList = JSON.parse(response).documents;
})()