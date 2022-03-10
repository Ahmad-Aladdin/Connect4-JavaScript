const playBtn = document.querySelector('.play');
const confirmBtn = document.querySelector('.confirm');
var mood = document.getElementById('mood').value;
var Vs = document.getElementById('vs').value;
var player1 = document.getElementById('user1').value


playBtn.addEventListener('click', (move) =>{
    mood = document.getElementById('mood').value;
    Vs = document.getElementById('vs').value;
    player1 = document.getElementById('user1').value
    if (Vs == "Player") {
        while ((!player2) || player2==player1) {
            var player2 = prompt('Player Two: Enter your name. You will be yellow.');
        };
    }
    window.localStorage.setItem("Mood", mood)
    window.localStorage.setItem("Vs", Vs)
    window.localStorage.setItem("player1", player1)
    window.localStorage.setItem("player2", player2)
    if(player1){
        if(Vs==="Player"){
            window.location.replace("player.html")
        }
        else if(Vs==="Computer"){
            window.location.replace("computer.html")
        }
    }
    else(
        alert("please enter your name and confirm your data")
    )
    });
