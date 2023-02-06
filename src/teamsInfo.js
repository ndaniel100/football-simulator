const fs = require('fs');
const request = require('request')

module.exports = {
    server: (req, res, index1, index2, teamList) => {
        home = teamList[index1]
        away = teamList[index2]

        res.send({}) 
    }
}
