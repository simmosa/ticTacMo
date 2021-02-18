//// selecting positions on the board
var cellDivs = document.querySelectorAll('.cell-divs');

function cellClicked(event) {  
    if (win === true) {
        return;
    }      
    // split the id name into coordinates.
    var posID = event.target.id.split("");
    var yPos = posID[0];
    var xPos = posID[1];
    
    // if the clickedCell is free, record the selection
    if (recordSelection(yPos, xPos)) {
        placeAvatar(event) // place avatar
        // check for win.
        if (checkForWinRow(yPos, xPos)) {
            console.log("win row.. " + currentPlayer + " wins");
        } else if (checkForWinCol(yPos, xPos)) {
            console.log("win col.. " + currentPlayer + " wins");
        } else if (checkDiagonals(yPos, xPos)) {
            console.log("diagonal win");
        }
    }
    
    swapTurns();
}

function placeAvatar(event) {
    // event.target.textContent = currentPlayer;
    if (currentPlayer === player1) {
        var imgElement = document. createElement("img");
        imgElement.src = "images/mo.gif";
        imgElement.classList.add("cell-avatar-class");
        event.target.append(imgElement);
    } else {
        var imgElement = document. createElement("img");
        imgElement.src = "images/mow.png";
        imgElement.classList.add("cell-avatar-class");
        event.target.append(imgElement);
    }
}

function recordSelection(y, x) {
    // ammends the boardArray and returns true if the space is free
    if ( boardArray[y][x].free ) {
        boardArray[y][x].player = currentPlayer;
        boardArray[y][x].free = false;
        return true; 
    }
}

function checkForWinRow(y, x) {
    // check rows
    for ( xI = 0; xI < boardArray[y].length; xI++ ) {
        if (boardArray[y][xI].player != currentPlayer) {
            return false;
        }
    }
    win = true;
    return true; // if it makes it there, it's a win.
}

function checkForWinCol(y, x) {
    //check columns
    for ( yI = 0; yI < boardArray[y].length; yI++ ) {
        if (boardArray[yI][x].player != currentPlayer) {
            return false;
        }
    }
    win = true;
    return true; // if it makes it there, it's a win.
}

function checkDiagonals(y, x) {
    return false;
}

// add eventListereners to cells. 
for (i = 0; i < cellDivs.length; i++) {
    cellDivs[i].addEventListener('click', cellClicked);
}

//// selecting reset button
var resetBtn = document.querySelector('.reset-btn');

function resetGame() {
    win = false;
    boardArray = [ [], [], [] ]; // resetting the record
    createGameBoard();
    currentPlayer = player1;
    //resetting the UI
    var imgArray = document.querySelectorAll("img.cell-avatar-class")
    for (i = 0; i < imgArray.length; i++) {
        console.log("removing child");
        imgArray[i].remove();
    }
}

resetBtn.addEventListener('click', resetGame);

///////////////////////////////// Set up the game //////////////

// Name of Players... Future option to prompt players for a name.
var player1 = "Player 1";
var player2 = "Player 2";

var win = false;

currentPlayer = player1;

function swapTurns() {
    if ( currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
}

var player1NameDiv = document.querySelector('.player-one-name-div');
var player2NameDiv = document.querySelector('.player-two-name-div');

player1NameDiv.textContent = player1;
player2NameDiv.textContent = player2;

// var positionType = ["top Left", ""];

var boardArray = [ [], [], [] ];

// a cell object
var cell = {
    player: "",
    // xPos: 0,
    // yPos: 0,
    free: true,
    potentialWin: false,
    winCheck: function(){}
}

// creating an empty game board
function createGameBoard() {
    for ( y = 0; y < 3; y++ ) {
        for ( x = 0; x < 3; x++ ) {
            var position = Object.create(cell);
            // position.yPos = x;
            // position.xPos = x;
            boardArray[y].push(position);
            // pushing onto an empty array so only need the y axis
        }
    }
}

createGameBoard();







