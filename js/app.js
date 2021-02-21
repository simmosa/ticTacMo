///////////////// the game play /////////////
// event listeners on buttons control the game.
var cellDivs = document.querySelectorAll('.cell-divs');

function cellClicked(event) {  
    if (win === true || !gameIsLive) {
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
            currentPlayerWins();
        } else if (checkForWinCol(yPos, xPos)) {
            currentPlayerWins();
        } else if (checkDiagonals()) {
            currentPlayerWins();
        }
    }
    
    swapTurns();
}
 
for (i = 0; i < cellDivs.length; i++) { //add event listeners to cells
    cellDivs[i].addEventListener('click', cellClicked);
}
/////////////// game play functions///////////
//////////
function placeAvatar(event) {
    // event.target.textContent = currentPlayer;
    if (currentPlayer === player1) {
        var imgElement = document.createElement("img");
        imgElement.src = "images/mo.gif";
        imgElement.classList.add("cell-avatar-class");
        event.target.append(imgElement);
    } else {
        var imgElement = document.createElement("img");
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

function checkDiagonals() {
    var diagonalWin = true; // need to disprove it
    //check top left then down first
    for (y = 0, x = 0; y < boardArray[0].length; y++, x++) {
        if (boardArray[y][x].player != currentPlayer) {
            diagonalWin = false;
            break;
        }
    }
    if (!diagonalWin) { // still no diagonal win check other diagonal
        diagonalWin = true; // resetting the condition
        for (y = 0, x = 2; y < boardArray[0].length; y++, x--) {
            if (boardArray[y][x].player != currentPlayer) {
                diagonalWin = false;
                break;
            }
        }
    }
    if (diagonalWin) { // needed to set the global win to be consistent with other win check functions.
        win = true;
    }
    return diagonalWin;
}

function currentPlayerWins() {
    addScoreToWinner();
    displayWinner();
    // playerBtnToReplay();
}

function displayWinner() {
    var messageDiv = document.querySelector('.message-div');
    messageDiv.classList.remove('hide-class');
    var messageH4 = document.querySelector('.message-h3');
    messageH4.textContent = `Congratulations !!! ${currentPlayer} is the winner!!!!`;
}

function hideMessageDiv() {
    var messageDiv = document.querySelector('.message-div');
    messageDiv.classList.add('hide-class');
}

function addScoreToWinner() {
    if (currentPlayer === player1) {
        player1Score++;
    } else {
        player2Score++;
    }
}

function swapTurns() {
    if ( currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
}

////////////////  Resetting Game  ///////////
// by selecting reset button

var resetBtn = document.querySelector('.reset-btn');

function resetGame() {
    //in case reset is pressed while entering player names or after end of game.
    hideMessageDiv();
    hideEnterPlayerDiv();
    
    gameIsLive = false;
    win = false;
    boardArray = [ [], [], [] ]; // resetting the record
    createGameBoard();

    player1 = "Player 1";
    player2 = "Player 2";
    currentPlayer = player1;
    displayPlayerNames()
    //resetting the UI
    var imgArray = document.querySelectorAll("img.cell-avatar-class")
    for (i = 0; i < imgArray.length; i++) {
        imgArray[i].remove();
    }
}

resetBtn.addEventListener('click', resetGame);


/////////////// Entering player names  ////////////
/// by pressing player button 
// this section also sets the game to live.

var playerBtn = document.querySelector('.select-player-btn');

function showEnterPlayerDiv() {
    if ( !gameIsLive) {
        var enterNameDiv = document.querySelector('.enter-name-div');
        var playerNameH4 = document.querySelector('.player-name-h4');
        playerNameH4.textContent = currentPlayer;
        enterNameDiv.classList.remove('hide-class');
    }
}

playerBtn.addEventListener('click', showEnterPlayerDiv);

function hideEnterPlayerDiv() {
    var enterNameDiv = document.querySelector('.enter-name-div');
    enterNameDiv.classList.add('hide-class');
    
    var playerInput = document.querySelector('.player-input');
    playerInput.value = ""; // reset the placeholder.
}

var submitBtn = document.querySelector('.submit-btn');

function sumbit() { // also sets the gameIsLive = true
    // get the players name and set gameIsLive = true.
    var playerInput = document.querySelector('.player-input');
    if (currentPlayer === player1) {
        player1 = playerInput.value;
        currentPlayer = player2;
        var playerNameH4 = document.querySelector('.player-name-h4');
        playerNameH4.textContent = currentPlayer;
        displayPlayerNames();
        playerInput.value = "";
    } else if (playerInput.value != player1) { // Names need to be unique.
        player2 = playerInput.value;
        currentPlayer = player1; //always start with player 1 on new game.
        playerInput.value = "";
        displayPlayerNames();
        hideEnterPlayerDiv();
        gameIsLive = true;
    }
}
submitBtn.addEventListener('click', sumbit);

///////////////////////// Set up the game from scratch  ///////

var player1 = "Player 1";
var player2 = "Player 2";

var player1Score = 0;
var player2Score = 0;

var gameIsLive = false; // Used to freeze buttons from upsetting the game play.
var win = false; // tracks the status of the game

currentPlayer = player1;


function displayPlayerNames() {
    var player1NameDiv = document.querySelector('.player-one-name-div');
    var player2NameDiv = document.querySelector('.player-two-name-div');

    player1NameDiv.textContent = player1;
    player2NameDiv.textContent = player2;
}

// var positionType = ["top Left", ""];

var boardArray = [ [], [], [] ];

// a cell object
var cell = {
    player: "",
    // xPos: 0,
    // yPos: 0,
    free: true,
    potentialWin: false, // was wanting to use this to help the an AI player
    winCheck: function(){} // nice idea but didn't implement. 
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

// createGameBoard();
// displayPlayerNames();

resetGame();


