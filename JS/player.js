
 
 var player1= localStorage.getItem("player1");
 var player2=localStorage.getItem("player2");
 var player1Color = 'red';
 var player2Color = 'yellow';

// Selectors

var tableRow = document.getElementsByTagName('tr');
var tableData = document.getElementsByTagName('td');
var playerTurn = document.querySelector('.player-turn');
const slots = document.querySelectorAll('.slot');
const playBtn = document.querySelector('.play');
var starting = false;
var currentPlayer = 1;
let winner;
playerTurn.textContent = `${player1}'s turn!`

// Log cell coordinates when clicked

for (i = 0; i < tableData.length; i ++){
    tableData[i].addEventListener('click', (e) =>{
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
};


// confirm wins

function confirming(player) {
    var confirmassg = confirm(`${player} WINS!! do you want play again .`);

    if (confirmassg === true ){

        slots.forEach(slot => {
            slot.style.backgroundColor = 'white';
        });
        starting = false;
        playerTurn.style.color = 'black';
        return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
    }
    else{
    window.location.replace("index.html")
    localStorage.clear();
    }
}

//play
function changeColor(e){
    // Get clicked column index
    let column = e.target.cellIndex;
    var row = [];
    playBtn.addEventListener('click', (confim) => starting = true);
    if(starting === true ){
    for (i = 5; i > -1; i--){
        if (tableRow[i].children[column].style.backgroundColor == 'white'){
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1){
                row[0].style.backgroundColor = 'red';
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player1} WINS!!`;
                    playerTurn.style.color = player1Color;
                    return confirming(player1);
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!';
                    return alert('DRAW!');
                }else{
                    playerTurn.textContent = `${player2}'s turn`
                    return currentPlayer = 2;
                }
            }else{
                row[0].style.backgroundColor = 'yellow';
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.style.color = player2Color;
                    return confirming(player2);
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!';
                    return alert('DRAW!');
                }else{
                    playerTurn.textContent = `${player1}'s turn`;
                    return currentPlayer = 1;
                }
                
            }
        }
    }
}
   
}

//add color
Array.prototype.forEach.call(tableData, (cell) => {
    cell.addEventListener('click', changeColor);
    // Set all slots to white for new game.
    cell.style.backgroundColor = 'white';
});
