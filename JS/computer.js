// Selectors
var player1 = localStorage.getItem("player1");
var player2 = "Computer"
var player1Color = 'red';
var player2Color = 'yellow';
var tableRow = document.getElementsByTagName('tr');
var tableData = document.getElementsByTagName('td');
var playerTurn = document.querySelector('.player-turn');
const slots = document.querySelectorAll('.slot');
const playBtn = document.querySelector('.play');
var starting = false;
var currentPlayer = 1;
let winner;
playerTurn.textContent = `Player Name : ${player1}`


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
        currentPlayer === 1
    }
    else {
        window.location.replace("index.html")
        localStorage.clear();
    }
}
function generateRandom(min = 0, max = 6) {

    var difference = max - min;
    var rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
}

function changeColor(e) {
    // Get clicked column index
    // let generatedcolo= generateRandom(0, 6);
    let column = e.target.cellIndex;
    var row = [];
    playBtn.addEventListener('click', (confim) => starting = true);
    if (starting === true) {
        for (i = 5; i > -1; i--) {
            if (currentPlayer === 1) {
                console.log(i)
                if (tableRow[i].children[column].style.backgroundColor == 'white') {
                    row.push(tableRow[i].children[column]);
                    row[0].style.backgroundColor = 'red';
                    if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()) {
                        return confirming(player1);
                    } else if (drawCheck()) {
                        return alert('DRAW!');
                    } else {
                        return currentPlayer = 2;
                    }
                }
            }
            else { changeColorcomputer();}

        }
    }

}

function changeColorcomputer() {
    let generatedcolo = generateRandom(0, 6);
    var row = [];
    if (starting === true) {
        for (i = 5; i > -1; i--) {
            if (currentPlayer === 2) {
                if (tableRow[i].children[generatedcolo].style.backgroundColor == 'white') {
                    row.push(tableRow[i].children[generatedcolo]);
                    row[0].style.backgroundColor = 'yellow';
                    if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()) {
                        return confirming(player2);
                    } else if (drawCheck()) {
                        return alert('DRAW!');
                    } else {
                        return currentPlayer = 1;
                    }

                }
            }
        }
    }
}

Array.prototype.forEach.call(tableData, (cell) => {
    cell.addEventListener('click', changeColor, true);
    cell.addEventListener('click', changeColorcomputer, true);
    // Set all slots to white for new game.
    cell.style.backgroundColor = 'white';
});

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}

function horizontalCheck() {
    for (let row = 0; row < tableRow.length; row++) {
        for (let col = 0; col < 4; col++) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row].children[col + 1].style.backgroundColor,
                tableRow[row].children[col + 2].style.backgroundColor, tableRow[row].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function verticalCheck() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col].style.backgroundColor,
                tableRow[row + 2].children[col].style.backgroundColor, tableRow[row + 3].children[col].style.backgroundColor)) {
                return true;
            };
        }
    }
}

function diagonalCheck() {
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col + 1].style.backgroundColor,
                tableRow[row + 2].children[col + 2].style.backgroundColor, tableRow[row + 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }

}

function diagonalCheck2() {
    for (let col = 0; col < 4; col++) {
        for (let row = 5; row > 2; row--) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row - 1].children[col + 1].style.backgroundColor,
                tableRow[row - 2].children[col + 2].style.backgroundColor, tableRow[row - 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

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