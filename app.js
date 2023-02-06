const express = require('express');
const fs = require('fs')
const app = express()
const port = process.env.PORT || 3000; 
const mongoDB = require('./src/mongodb.js')
const info = require('./src/teamsInfo.js'); 
const simGame = require('./src/simulate.js'); 

app.use(express.static('public'))
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/public/view`);

app.get('/', function (req, res) {
    res.render('menu')
})

app.get('/select', async function (req, res) {
    const teamList = await mongoDB.teamList
    //alphabetic sorting
    teamList.sort( function( a, b ) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
    res.render('selectTeam', {
        clubs: teamList
    })
})

app.get('/getTeams', async function (req, res) {
    const teamList = await mongoDB.teamList
    res.send(teamList)
})

app.post('/teamsInfo', async function(req, res){ 
    const teamList = await mongoDB.teamList
    var homeTeam = req.body.homeTeam
    var awayTeam = req.body.awayTeam
    info.server(req, res, homeTeam, awayTeam, teamList)
});

app.post('/simulate', async function(req, res){ 
    const teamList = await mongoDB.teamList
    var homeTeam = req.body.homeTeam
    var awayTeam = req.body.awayTeam
    simGame.server(req, res, homeTeam, awayTeam, teamList)
});

app.get('/simulate', function(req, res){ 
    res.render('startMatch', function(err, html) {
        if (err) return res.status(400).send({message: 'ERROR: No teams have been selected'});
        res.send(html)
    });   
});

app.listen(port, function(){
    console.log(`Listening on port ${port}`)
})
