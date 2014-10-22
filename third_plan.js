var tttapp = angular.module('tttapp', ["firebase"]);

tttapp.controller('tttController', function($scope, $timeout, $firebase) {

var firebaseRef = new Firebase("https://tictactoeajs.firebaseio.com/");

$scope.remoteBoxesContainer = 
    $firebase(new Firebase("https://tictactoeajs.firebaseio.com/" + '/remoteBoxesContainer')) ;

//created the board
$scope.boxes = [{
        clicked: false
    }, {
        clicked: false
    }, { 
        clicked: false
    }, {
        clicked: false
    }, { 
        clicked: false
    }, {
        clicked: false
    }, {
        clicked: false
    }, {
        clicked: false
    }, {
        clicked: false
    }];

$scope.boxesContainer = {
    boxList: $scope.boxes
};

$scope.remoteBoxesContainer.$bind($scope, "boxesContainer");
$scope.$watch('boxesContainer', function() {
    console.log('things changed!');
});

//define turns
var turnStatus = '';

//define player 1's turn
function turning1(){
    turnStatus = player_name_1 + "'s turn";
    $scope.turn_status = turnStatus;
    turncolor.colorpink = true;
    turncolor.colorblue = false;
    console.log("pink " + turncolor.colorpink + " and blue " + turncolor.colorblue);
};

//define player 2's turn
function turning2(){
    turnStatus = player_name_2 + "'s turn";
    $scope.turn_status = turnStatus;
    turncolor.colorpink = false;
    turncolor.colorblue = true;
    console.log("pink " + turncolor.colorpink + " and blue " + turncolor.colorblue);
};

var turncolor = [];

//initial status
var player_name_1 = "player 1";
var player_name_2 = "player 2";
$scope.tie_count = "Tie";
   
//Beginning prompts
window.onload = function() {
    promptPlayer1();
};

//player 1 check in
function promptPlayer1() { 
        player_name_1 = prompt("Player 1, enter your name below\n(no more than 10 characters):");
        if ( (player_name_1 == null) || (player_name_1.length > 10) || (player_name_1.length == 0) ) {
            promptPlayer1();
        }
        else {
            $scope.player1Status = player_name_1 + ": " + player1Win;
            promptPlayer2();
        };
};

//player 2 check in
function promptPlayer2() {
        player_name_2 = prompt("Player 2, enter your name below\n(no more than 10 characters):");
        if ( (player_name_2 == null) || (player_name_2.length > 10) || (player_name_2.length == 0) ) {
            promptPlayer2();
        }
        else {
            $scope.player2Status = player_name_2 + ": " + player2Win;
            $scope.tie_count = "Tie: " + howManyTies;
            turnStatus = player_name_1 + " goes first!";
            $scope.turn_status = turnStatus;
            turncolor.colorpink = true;
            console.log("pink " + turncolor.colorpink);
        };
};

//game is ready
var player1Win = 0;
$scope.player1Status = player_name_1; 
var player2Win = 0;
$scope.player2Status = player_name_2; 

var howManyTies = 0;
var player1WinCount = 0;
var player2WinCount = 0;

//game starts
var howManyClicks = 0;

$scope.clickIt = function(box) {
    // if our box has been clicked if box.clicked
    // equal true
            // Then do nothing, don't increment, etc
    // if its false,
            // Then our box's clicked property to be true
            // increment how many clicks
            // if odd, set box.odd  = true
            // else box.even = true
    if (box.clicked == false) {
        box.clicked = true;
        howManyClicks++;
        // howManyClicks => 1

        // odd check
        if (howManyClicks % 2 == 1) {
            //player 1
            box.odd = true;
            //check player 1's winning status
            //check each row of player 1
            for (var i = 0; i <= 8; i += 3) {
                var boxSelectedOddRow = [];
                for (var z = 0; z <= 2; z++) {
                    if ($scope.boxes[i+z].odd) {
                        console.log(i+z);
                        boxSelectedOddRow.push("win");
                    }
                }
                //check if player 1 win the row
                if (boxSelectedOddRow.length == 3) {
                    player1WinCount++;
                }
            };
            //check each column of player 1
            for (var i = 0; i <= 2; i++) {
                var boxSelectedOddColumn = [];
                for (var z = 0; z <= 8; z += 3) {
                    if ($scope.boxes[i+z].odd) {
                        boxSelectedOddColumn.push("win");
                    }
                }
                //check if player 1 win the column
                if (boxSelectedOddColumn.length == 3) {
                    player1WinCount++;
                }
            };
            //check the first digonal
            if ($scope.boxes[0].odd && $scope.boxes[4].odd && $scope.boxes[8].odd ) {
                    player1WinCount++;
            };
            //check the second digonal
            if ($scope.boxes[2].odd && $scope.boxes[4].odd && $scope.boxes[6].odd ) {
                    player1WinCount++;
            };
            //change to player 2's turn
            if ( (howManyClicks < 9) && (player1WinCount == 0) ) {
                turning2(); 
            };
            //game is tied
            if ( (howManyClicks == 9) && (player1WinCount == 0) ) {
                howManyTies++;
                $scope.tie_count = "Tie: " + howManyTies;
                turnStatus = "It's tied!";
                nextRound();
                $scope.turn_status = turnStatus;
                turncolor.colorpink = false;
                urncolor.colorblue = false;
                console.log("pink " + turncolor.colorpink + " and blue " + turncolor.colorblue);
            };
            //check if player 1 win
            if (player1WinCount > 0) {
                pinkWin();
            };
        }
        else {
            //player 2
            box.even = true;
            //check player 2's winning status
            //check each row of player 2
            for (var i = 0; i <= 8; i += 3) {
                var boxSelectedEvenRow = [];
                for (var z = 0; z <= 2; z++) {
                    if ($scope.boxes[i+z].even) {
                        console.log(i+z);
                        boxSelectedEvenRow.push("win");
                    }
                }
                //check if player 2 win the
                if (boxSelectedEvenRow.length == 3) {
                    blueWin();
                }
            };
            //check each column of player 2
            for (var i = 0; i <= 2; i++) {
                var boxSelectedEvenColumn = [];
                for (var z = 0; z <= 8; z += 3) {
                    if ($scope.boxes[i+z].even) {
                        console.log(i+z);
                        boxSelectedEvenColumn.push("win");
                    }
                }
                //check if player 2 win the column
                if (boxSelectedEvenColumn.length == 3) {
                    player2WinCount++;
                }
            };
            //check the first digonal
            if ($scope.boxes[0].even && $scope.boxes[4].even && $scope.boxes[8].even ) {
                    console.log(boxes[0], boxes[4], boxes[8]);
                    player2WinCount++;
            };
            //check the second dogonal
            if ($scope.boxes[2].even && $scope.boxes[4].even && $scope.boxes[6].even ) {
                    console.log(boxes[2], boxes[4], boxes[6]);
                    player2WinCount++;
            };
            //change to player 1's turn
            if (player2WinCount == 0) {
                turning1();
            };
            if (player2WinCount > 0) {
                blueWin();
            };
        };
    };  
};

//when player 1 wins
pinkWin = function () {
    $timeout(function() {
        turnStatus = player_name_1 + " (pink) win!";
        $scope.turn_status = turnStatus;
        player1Win++;
        $scope.player1Status = player_name_1 + ": " + player1Win;
        for ( i = 0; i <= 8; i++ ) {
            if ($scope.boxes[i].clicked == false) {
                $scope.boxes[i].clicked = true;
            };
        };
        nextRound();
        turncolor.colorpink = true;
        turncolor.colorblue = false;
        console.log("pink " + turncolor.colorpink + " and blue " + turncolor.colorblue);

    }, 10); 
};

//when player 2 wins
blueWin = function () {
   $timeout(function() {
        turnStatus = player_name_2 + " (blue) win!";
        $scope.turn_status = turnStatus;
        player2Win++;
        $scope.player2Status = player_name_2 + ": " + player2Win;
        for ( i = 0; i <= 8; i++ ) {
            if ($scope.boxes[i].clicked == false) {
                $scope.boxes[i].clicked = true;
            };
        };
        nextRound();
        turncolor.colorpink = false;
        turncolor.colorblue = true;
        console.log("pink " + turncolor.colorpink + " and blue " + turncolor.colorblue);
    }, 10); 
};

//change players after 15 rounds
function nextRound() {
    $timeout(function() {
        console.log( player1Win + player2Win + howManyTies );
        if ( (player1Win + player2Win + howManyTies) == 3) {
            var askForReplacement = confirm("You have been played for 3 rounds!\nWhy not save some time for the others?");
            if (askForReplacement) {
                window.location.reload();
            }
            else {
                alert("Sorry we have to reset your game!");
                window.location.reload();
            }
        }
    }, 700); 
};

//only reload the board
$scope.clickToReloadBoard = function() {
    if ( (player1WinCount > 0) || (player2WinCount > 0) || (howManyClicks == 9) ) { 
        for ( i = 0; i < 9; i++ ) {
            $scope.boxes[i].odd = false;
            $scope.boxes[i].even = false;
            $scope.boxes[i].clicked = false;
            howManyClicks = 0;
            player1WinCount = 0;
            player2WinCount = 0;
            turncolor.colorpink = true;
            turncolor.colorblue = false;
            turnStatus = player_name_1 + " goes first!";
            $scope.turn_status = turnStatus;
            console.log("pink " + turncolor.colorpink);
        };
    }
    else {
        alert("You haven't complete this round yet!");
    };
};

//reload the page
$scope.clickToReloadPage = function() {
    if ( (player1WinCount > 0) || (player2WinCount > 0) || (howManyClicks == 9) ) {
        var playWithNew = confirm("Are you sure you wanna leave the game right now?\nYou still have " + ( 3 - player1Win - player2Win - howManyTies ) + " round(s) to go!\nClick \"OK\" to continue the game;\nClick \"Cancel\" to start a new game with someone else.");
        if (!playWithNew) {
            window.location.reload();
        };
    }
    else if ( (player1Win == 0) && (player2Win == 0) && (howManyTies == 0) && (howManyClicks == 0) ) {
        var playWithNew = confirm("Are you sure you wanna leave the game right now?\nYou don't even start it yet!\nClick \"OK\" to continue the game;\nClick \"Cancel\" to start a new game with someone else.");
        if (!playWithNew) {
            window.location.reload();
        };
    }
    else {
        alert("You haven't complete this round yet!");
    };
};

//firebase

});