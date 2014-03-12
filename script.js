var canvas = document.getElementById("canvas");

var c = canvas.getContext('2d');

var controller = new Leap.Controller();

var width = 800;
var height = 600;

canvas.width = width;
canvas.height = height;

c.font = "30px Arial";
c.textAlign = 'center';
c.textBaseline = 'middle';

controller.on('frame', function( frame ){
  c.clearRect(0, 0, width, height);

  var numOfHands = frame.hands.length;
  var move = "";
  var move1 = "";
  var move2 = "";
  var y = 300;
  var yLimit = 100;
  var robotMove = "";
  var rock = "http://www.headfirstlabs.com/books/hfjs/ch03/irock/rock.png"
  var paper = "http://fc02.deviantart.net/fs71/f/2010/148/0/8/loose_leaf_paper_by_dianasurvive.png"
  var scissors = "http://www.boston.com/ae/theater_arts/exhibitionist/scissors.png"

  if (numOfHands < 1){
    move = ""
    robotMove = ""
  }else if (numOfHands == 1){//single player
    var numOfFingers = frame.fingers.length;
    y = frame.hands[0].palmPosition[1];

    if (y > yLimit){
      if (numOfFingers <= 1){
        move = "You: Rock";
        robotMove = "Robot: Paper";
      }else if(numOfFingers === 2 || numOfFingers === 3){
        move = "You: Scissors";
        robotMove = "Robot: Rock";
      }else if(numOfFingers === 4 || numOfFingers === 5){
        move = "You: Paper";
        robotMove = "Robot: Scissors";
      }else{
        move = ""
        robotMove = "";
      }
    }
  }else if (numOfHands == 2) {//2 player
    var hand1 = frame.hands[0];
    var hand2 = frame.hands[1];

    y = hand1.palmPosition[1];

    var numOfFingers1 = hand1.fingers.length;
    var numOfFingers2 = hand2.fingers.length;
    move1 = "Loading";
    move2 = "Loading";
    if (numOfFingers1 <= 1){
      move1 = "Rock";
    }else if(numOfFingers1 === 2 || numOfFingers1 === 3){
      move1 = "Scissors";
    }else if(numOfFingers1 === 4 || numOfFingers1 === 5){
      move1 = "Paper";
    }else{
      move1 = "Can't detect."
    }

    if (numOfFingers2 <= 1){
      move2 = "Rock";
    }else if(numOfFingers2 === 2 || numOfFingers2 === 3){
      move2 = "Scissors";
    }else if(numOfFingers2 === 4 || numOfFingers2 === 5){
      move2 = "Paper";
    }else{
      move2 = "Can't detect."
    }
  }else{
    move = "Too many hands"; 
  }

  c.fillText( move+" "+move1+" "+move2+" "+robotMove, width/2, height/2);
});

