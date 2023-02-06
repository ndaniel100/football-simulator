window.onload = async function(){
    const homeBtn = document.getElementById('homeBtn')
    var chosen1 = localStorage.getItem("homeTeam") || "0"
    var chosen2 = localStorage.getItem("awayTeam") || "1"
    var time = document.querySelector("body > div > div.page-header > div > span")
    var scoreline = document.querySelector("body > div > div.page-score > div.score-line > b")
    var clock = 0
    var score1 = 0
    var score2 = 0
    
    var data = JSON.stringify({ 
        "homeTeam": chosen1, 
        "awayTeam": chosen2
    });
    
    var timeGap = setInterval(async function () {
        clock += 5
        if (clock == 95){
            time.textContent = "Full Time"
            return clearInterval(timeGap)
        }
        var e = await postReq(`${location.origin}/simulate`, data)
        time.textContent = `${clock.toString()}'`
        if (e.team == 0 || e.team == 1){
            if (e.team == 0) score1 += 1
            if (e.team == 1) score2 += 1
            scoreline.textContent = `${score1}-${score2}`
            document.getElementById('timeline').innerHTML += 
            `<div class="team-event-${e.team}">
                <span style="margin-left: 5px;margin-bottom: 10px;">${clock}'</span> 
                <img style="margin-left: 5px;margin-bottom: 10px;" height=15px src="https://i.imgur.com/YcAF6V9.png">
                <span style="margin-left: 5px;margin-bottom: 10px;overflow: hidden;max-width: 105px;">${e.player}</span> 
                <img style="margin-left: 5px;margin-bottom: 10px;border-radius: 30px;background-color: #63709a;" height=20px src=${e.face}>
            </div>`
        }
    }, 2000);

    homeBtn?.addEventListener('click', async event => {
        document.location.href = `${location.origin}`;
    });

    async function postReq(url, selectedTeams){
        var res = await fetch(url, {
            method: 'POST',
            body: selectedTeams,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        var d = await res.json()
        return d;
    }
}