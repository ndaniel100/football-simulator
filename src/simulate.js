function randomRange(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {
    server: (req, res, index1, index2, teamList) => {
        var lineup1 = teamList[index1].lineup
        var lineup2 = teamList[index2].lineup

        var r1 = teamList[index1].rank
        var r2 = teamList[index2].rank
        
        var i1 = 13 + (r1-r2)/3
        var i2 = 13 + (r2-r1)/3

        var randomInt1 = randomRange(0, i1)
        var randomInt2 = randomRange(0, i2)

        //home teams get an advantage as if both randomInts return 0 then home team gets the goal because of the else if statement
        console.log(i1 + " - " + randomInt1)
        console.log(i2 + " - " + randomInt2)
        console.log("-----")
        if (randomInt1 == 0){
            var player = lineup1.slice(0,10).filter(p=>randomRange(0, 10) > randomRange(6, 7))[0]
            if (!player) return res.send({});
            player.team = 0
            res.send(player)
        }
        else if (randomInt2 == 0){
            var player = lineup2.slice(0,10).filter(p=>randomRange(0, 10) > randomRange(6, 7))[0]
            if (!player) return res.send({});
            player.team = 1
            res.send(player)
        }
        else res.send({})
    }
}
