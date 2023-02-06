window.onload = async function(){
    var savedIndex1 = 0
    var savedIndex2 = 0
    const arrs = document.querySelectorAll('[class^=arrow1]')
    const arrs2 = document.querySelectorAll('[class^=arrow2]')
    const rating = document.getElementsByClassName("club-rating")[0]
    const rating2 = document.getElementsByClassName("club-rating")[1]
    const btn = document.getElementById('but2')
    const homeBtn = document.getElementById('homeBtn')
    
    //getTeams
    var teams = await getReq(`${location.origin}/getTeams`)

    //ratinfgs
    function addRatings(rating, teamRating){
        rating.innerHTML = ''
        var stars = 5 - Math.floor(teamRating.rank/4)/2
        for(let i=0; i < Math.round(stars); i++){ 
            if (stars % 1 == 0 && i == Math.round(stars) - 1) rating.innerHTML += '<img height="35px" style="margin-left: 7px;" src="https://i.imgur.com/RvDeT0k.png">'
            if (stars % 1 != 0 && i == Math.round(stars) - 1) rating.innerHTML += '<img height="35px" style="margin-left: 7px;" src="https://i.imgur.com/d300gz5.png">'
            if (i < stars - 1) rating.innerHTML += '<img height="35px" style="margin-left: 7px;" src="https://i.imgur.com/RvDeT0k.png">'
        } 
    }

    if (rating) addRatings(rating, teams[savedIndex1])
    if (rating2) addRatings(rating2, teams[savedIndex2])

    //arrows
    arrs.forEach(a => {
        a.addEventListener('click', async event => {
            if (event.target.id == 'left-arrow') savedIndex1 += -1
            if (event.target.id == 'right-arrow') savedIndex1 += 1

            if (savedIndex1 > teams.length-1) savedIndex1 = 0
            if (savedIndex1 < 0) savedIndex1 = teams.length-1

            document.getElementsByClassName('club-name')[0].innerHTML = `<p>${teams[savedIndex1].name}</p> `
            document.getElementsByClassName('league-name')[0].innerHTML = `<b>${teams[savedIndex1].league}</b> `
            document.getElementsByClassName('country-flag')[0].innerHTML = `<img src=\"${teams[savedIndex1].flag}\" style="height: 46px;">`
            document.getElementsByClassName('club-logo')[0].innerHTML = `<img src=\"${teams[savedIndex1].logo}\">`

            addRatings(rating, teams[savedIndex1])
        });
    });

    arrs2.forEach(a => {
        a.addEventListener('click', async event => {
            if (event.target.id == 'left-arrow') savedIndex2 += -1
            if (event.target.id == 'right-arrow') savedIndex2 += 1

            if (savedIndex2 > teams.length-1) savedIndex2 = 0
            if (savedIndex2 < 0) savedIndex2 = teams.length-1

            document.getElementsByClassName('club-name')[1].innerHTML = `<p>${teams[savedIndex2].name}</p> `
            document.getElementsByClassName('league-name')[1].innerHTML = `<b>${teams[savedIndex2].league}</b> `
            document.getElementsByClassName('country-flag')[1].innerHTML = `<img src=\"${teams[savedIndex2].flag}\" style="height: 46px;">`
            document.getElementsByClassName('club-logo')[1].innerHTML = `<img src=\"${teams[savedIndex2].logo}\">`

            addRatings(rating2, teams[savedIndex2])
        });
    });
    
    //buttons
    homeBtn?.addEventListener('click', async event => {
        document.location.href = `${location.origin}`;
    });

    btn?.addEventListener('click', async event => {
        var data = JSON.stringify({ 
            "homeTeam": savedIndex1, 
            "awayTeam": savedIndex2
        });

        localStorage.setItem("homeTeam",savedIndex1);
        localStorage.setItem("awayTeam",savedIndex2);

        await postReq(`${location.origin}/teamsInfo`, data)
        document.location.href = `${location.origin}/simulate`;
    });

    //requests
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

    async function getReq(url){
        var res = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        var d = await res.json()
        return d;
    }
}