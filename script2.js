function changeIcon(domImg,srcImage) {
    var img = new Image();
    img.onload = function() {
        // Load completed
        domImg.src = this.src;
    };

    img.src = srcImage;
}

// var canvas = document.getElementById("canvas");
//
// var c = canvas.getContext('2d');

//initialize leap controller
var controller = new Leap.Controller();

var width = 800;
var height = 600;

//Set canvas size
// canvas.width = width;
// canvas.height = height;

//Set text font
/* c.font = "30px Arial"; */

//Set countdown variables
var count = 0;
var countReady = false;

//Initialize message values
var robotMove = "";
var move1 = "";
var move2 = "";
var msg = "";

var yResetLimit = 40;
var yCountLimit = 200;
var y = yCountLimit - 1; //starting y value (yCountLimit > y > yResetLimit)
var triggerCount = 4;


var mode = ""; //can be: nobody, single, double, multi
var text = "";

changeIcon(document.getElementById("img"),"images/rock.png");

controller.on('frame', function( frame ){
  /* c.clearRect(0, 0, width, height);//clear the rectangle */


  numOfHands = frame.hands.length;
  if (numOfHands < 1){
    mode = "nobody";
  }else if(numOfHands == 1){
    mode = "single";
    y = frame.hands[0].palmPosition[1];
    var numOfFingers = frame.hands[0].fingers.length; 

    if (y <= yResetLimit){
      count = 0;
    }else if(y > yResetLimit && y <= yCountLimit && countReady){
      if (count < triggerCount){
        count += 1;
        countReady = false;
        changeIcon(document.getElementById("img"),"images/paper.png");
      }
    }else if(y > yCountLimit){
      countReady = true;
    }

    if (count === triggerCount){//shoot
      if (numOfFingers === 0 || numOfFingers === 1){
        //played rock, response is paper
        text = "Paper";
        changeIcon(document.getElementById("img"),"images/rock.png");
      }else if(numOfFingers === 2 || numOfFingers === 3){
        //played scissors, response is rock
        text = "Rock";
        changeIcon(document.getElementById("img"),"images/scissors.png");
      }else if(numOfFingers === 4 || numOfFingers === 5){
        //played paper, response is scissors
        text = "Scissors";
        changeIcon(document.getElementById("img"),"images/paper.png");
      }
    }else if(count === 0){
      text = "Ready.";
    }else if(count < triggerCount){
      text = triggerCount-count;
    }else{
      text = "Reset Count";
    }
  // }else if(numOfHands == 2){
  //   mode = "double";

  //   var hand1 = frame.hands[0];
  //   var hand2 = frame.hands[1];

  //   var numOfFingers1 = hand1.fingers.length;
  //   var numOfFingers2 = hand2.fingers.length;

  //   y = frame.hands[0].palmPosition[1];

  //   if (y <= yResetLimit){
  //     count = 0;
  //   }else if(y > yResetLimit && y <= yCountLimit && countReady){
  //     count += 1;
  //     countReady = false;
  //   }else if(y > yCountLimit){
  //     countReady = true;
  //   }

  //   if (count === triggerCount){//shoot

  //     if (numOfFingers1 <= 1){
  //       move1 = "Rock";
  //     }else if(numOfFingers1 === 2 || numOfFingers1 === 3){
  //       move1 = "Scissors";
  //     }else if(numOfFingers1 === 4 || numOfFingers1 === 5){
  //       move1 = "Paper";
  //     }else{
  //       move1 = "Can't detect."
  //     }

  //     if (numOfFingers2 <= 1){
  //       move2 = "Rock";
  //     }else if(numOfFingers2 === 2 || numOfFingers2 === 3){
  //       move2 = "Scissors";
  //     }else if(numOfFingers2 === 4 || numOfFingers2 === 5){
  //       move2 = "Paper";
  //     }else{
  //       move2 = "Can't detect."
  //     }
  //     text = move1+' '+move2;
  //   }else if(count < triggerCount){
  //     text = triggerCount-count;
  //   }else{
  //     text = "Reset count";
  //   }
  }else{
    mode = "multi";
  }

  /* c.fillText( text, width/2, height/2); */


});

controller.connect();
