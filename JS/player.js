var mood = localStorage.getItem("Mood")/////easy   or hard ///////
var player1 = localStorage.getItem("player1");
var play = localStorage.getItem("Vs")
if (play === 'Player'){
var player2 = localStorage.getItem("player2");}
if (play === 'Computer'){
var player2 = "Computer";}
var player1Color = 'red';
var player2Color = 'yellow';
var tableRow = document.getElementsByTagName('tr');
var tableData = document.getElementsByTagName('td');
if (play === 'Computer'){
var playervscomputer = document.querySelector('.player-turn');
var playerTurn = document.querySelector('.player');
playervscomputer.textContent = `Player Name : ${player1}`
}
if (play === 'Player'){
var playerTurn = document.querySelector('.player-turn');
}
const slots = document.querySelectorAll('.slot');
const playBtn = document.querySelector('.play');
var starting = false;
let currentPlayer = 1;
let winner;

playerTurn.textContent = `${player1}'s turn!`
playerTurn.style.color = 'red' 

// Log cell coordinates when clicked

for (i = 0; i < tableData.length; i++) {
    tableData[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
};



// Funtions
   
function confirming(player) {
    var confirmassg = confirm(`${player} WINS!! do you want play again .`);

    if (confirmassg === true) {

        slots.forEach(slot => {
            slot.style.backgroundColor = 'white';
        });
        starting = false;
        playerTurn.style.color = 'red';
        currentPlayer = 1 ;
        return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
    }
    else {
        window.location.replace("index.html")
        localStorage.clear();
    }
}


function Draw() {
    var massg = confirm(`Game is over play again`);

    if (massg === true) {

        slots.forEach(slot => {
            slot.style.backgroundColor = 'white';
        });
        starting = false;
        playerTurn.style.color = 'black';
        currentPlayer = 1 ;
        return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
    }
    else {
        window.location.replace("index.html")
        localStorage.clear();
    }
}
playBtn.addEventListener('click', (confim) => starting = true);

function playing(play,e){

    if (play === 'Player'){
        changeColor;
    }

    else {
        if(currentPlayer === 1){
            changeColor;
        }if(currentPlayer === 2){
            changeColorcomputer;
        }
   }

}
//////////player//////////////////////

function changeColor(e) {
    // Get clicked column index
    let column = e.target.cellIndex;
    var row = [];
    if (starting === true) {
        for (i = 5; i > -1; i--) {
            if (tableRow[i].children[column].style.backgroundColor == 'white') {
                row.push(tableRow[i].children[column]);
                if (currentPlayer === 1) {
                    row[0].style.backgroundColor = 'red';
                    if (mood == 'easy') {
                        if (checkeasy()) {
                            playerTurn.textContent = `${player1} WINS!!`;
                            playerTurn.style.color = player1Color;
                            return confirming(player1);
                        } else if (drawCheck()) {
                            playerTurn.textContent = 'DRAW!';
                            return Draw();
                        } else {
                            playerTurn.style.color = 'yellow' 
                            playerTurn.textContent = `${player2}'s turn`
                            currentPlayer = 2;
                            return playing(play)
                        }
                    }
                    if (mood == 'hard') {
                        if (checkhard()) {
                            playerTurn.textContent = `${player1} WINS!!`;
                            playerTurn.style.color = player1Color;
                            return confirming(player1);
                        } else if (drawCheck()) {
                            playerTurn.textContent = 'DRAW!';
                            return Draw();
                        } else {
                            playerTurn.style.color = 'yellow' 
                            playerTurn.textContent = `${player2}'s turn`
                            currentPlayer = 2;
                            return playing(play)
                        }
                    }


                } else {
                    row[0].style.backgroundColor = 'yellow';
                    if (mood == 'easy') {
                        if (checkeasy()) {
                            playerTurn.textContent = `${player2} WINS!!`;
                            playerTurn.style.color = player2Color;
                            return confirming(player2);
                        } else if (drawCheck()) {
                            playerTurn.textContent = 'DRAW!';
                            return Draw();
                        } else {
                            playerTurn.style.color = 'red' 
                            playerTurn.textContent = `${player1}'s turn`
                            currentPlayer = 1;
                            return playing(play)
                        }
                    }
                    if (mood == 'hard') {
                        if (checkhard()) {
                            playerTurn.textContent = `${player2} WINS!!`;
                            playerTurn.style.color = player2Color;
                            return confirming(player2);
                        } else if (drawCheck()) {
                            playerTurn.textContent = 'DRAW!';
                            return Draw();
                        } else {
                            playerTurn.style.color = 'red' 
                            playerTurn.textContent = `${player1}'s turn`
                            currentPlayer = 1;
                            return playing(play)
                        }
                    }
                }
            }
        }

    }}
/////////////////////////////computer/////////////////////
function generateRandom(min = 0, max = 6) {
    var difference = max - min;
    var rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
}

function changeColorcomputer() {
    console.log("compfunc")
    let generatedcolo = generateRandom(0, 6);
    var row = [];
    if (starting === true) {
        for (i = 5; i > -1; i--) {
            if (currentPlayer === 2) {
                if (tableRow[i].children[generatedcolo].style.backgroundColor == 'white') {
                    row.push(tableRow[i].children[generatedcolo]);
                    row[0].style.backgroundColor = 'yellow';
                    if(mood=='easy'){
                    if (checkeasy()) {
                        return confirming(player2);
                    } else if (drawCheck()) {
                        return Draw();
                    } else {
                        currentPlayer = 1;
                        return playing(play)
                    }
                }
                else{
                    if (checkhard()) {
                        return confirming(player2);
                    } else if (drawCheck()) {
                        return Draw();
                    } else {
                        currentPlayer = 1;
                        return playing(play)
                    }
                }

                }
            }
        }
    }
}

/////////////////////add color to table////////////////////
   
Array.prototype.forEach.call(tableData, (cell) => {
    
    cell.addEventListener('click', changeColor,true);
    if (play ==='Computer'){
    cell.addEventListener('click', changeColorcomputer, true);}
    
    // Set all slots to white for new game.
    cell.style.backgroundColor = 'white';
});
/////////////////easy check ///////////////////////////////////


function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}
///////horizontal check/////////
function checkeasy(){
    for (let row = 0; row < tableRow.length; row++){
        for (let col =0; col < 4; col++){
           if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor, 
                                tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
               return true;
           }
        }
    }
/////////vertical check/////////
    for (let col = 0; col < 7; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,
                                tableRow[row+2].children[col].style.backgroundColor,tableRow[row+3].children[col].style.backgroundColor)){
                return true;
            };
        }   
    }

}

 
//////////////////////////////hard check//////////////////////////////
function colorMatchCheckhard(one, two, three, four,five) {
    return (one === two && one === three && one === four && one == five &&one !== 'white' && one !== undefined);
}

function checkhard(){
   ///////horizontal check/////////
    for (let row = 0; row < tableRow.length; row++) {
        for (let col = 0; col < 3; col++) {
            if (colorMatchCheckhard(tableRow[row].children[col].style.backgroundColor, tableRow[row].children[col + 1].style.backgroundColor,
                tableRow[row].children[col + 2].style.backgroundColor, tableRow[row].children[col + 3].style.backgroundColor, tableRow[row].children[col + 4].style.backgroundColor)) {
                return true;
            }
        }
    }
  /////////vertical check/////////
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 2; row++) {
            if (colorMatchCheckhard(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col].style.backgroundColor,
                tableRow[row + 2].children[col].style.backgroundColor, tableRow[row + 3].children[col].style.backgroundColor, tableRow[row + 4].children[col].style.backgroundColor)) {
                return true;
            };
        }
    }
 ///////////////diagonal check 1/////////////
    for (let col = 0; col < 3; col++) {
        for (let row = 0; row < 2; row++) {
            if (colorMatchCheckhard(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col + 1].style.backgroundColor,
                tableRow[row + 2].children[col + 2].style.backgroundColor, tableRow[row + 3].children[col + 3].style.backgroundColor , tableRow[row + 4].children[col + 4].style.backgroundColor)) {
                return true;
            }
        }
    }
///////////////diagonal check 2/////////////
    for (let col = 0; col < 3; col++) {
        for (let row = 5; row > 3; row--) {
            if (colorMatchCheckhard(tableRow[row].children[col].style.backgroundColor, tableRow[row - 1].children[col + 1].style.backgroundColor,
                tableRow[row - 2].children[col + 2].style.backgroundColor, tableRow[row - 3].children[col + 3].style.backgroundColor,tableRow[row - 4].children[col + 4].style.backgroundColor)) {
                return true;
            }
        }
    }

  
}


//////////////////////////////draw check/////////////////////////////////////////////////////////////////////
function drawCheck() {
    let fullSlot = []
    for (i = 0; i < tableData.length; i++) {
        if (tableData[i].style.backgroundColor !== 'white') {
            fullSlot.push(tableData[i]);
        }
    }
    if (fullSlot.length === tableData.length) {
        return true;
    }
} 
