var request = require('request-promise');
(async() => {
var options = {
    'method': 'GET',
    'url': `https://sofifa.com/team/1395/team/?r=202200&set=true`,
    'headers': {
        'Content-Type': 'application/json'
    },
};

var response = await request(options);

var lineup = response.split("\n").find(e=>e.startsWith(`<div class="lineup"`))
var result = lineup.match(/(?<=title="\s*).*?(?=\s*")/gs).map(p=>p.split(" ").pop()); //all player names
var pics = lineup.match(/(?<=data-src="\s*).*?(?=\s*")/gs); //all player faces
var xi = []

for (i in result){
    var obj = {player: result[i], face: pics[i]}
    xi.push(obj)
}
console.log(JSON.stringify((xi)))

})();