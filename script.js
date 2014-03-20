function changeIcon(domImg,srcImage) {
    var img = new Image();
    img.onload = function() {
        // Load completed
        domImg.src = this.src;
    };

    img.src = srcImage;
}

//initialize leap controller
var controller = new Leap.Controller();

changeIcon(document.getElementById("img"),"images/rock.png");

controller.on('frame', function( frame ){

  numOfHands = frame.hands.length;
  if(numOfHands == 1){
    var numOfFingers = frame.hands[0].fingers.length; 

    if (count === triggerCount){//shoot
      if (numOfFingers === 0 || numOfFingers === 1){
        changeIcon(document.getElementById("img"),"images/rock.png");
      }else if(numOfFingers === 2 || numOfFingers === 3){
        changeIcon(document.getElementById("img"),"images/scissors.png");
      }else if(numOfFingers === 4 || numOfFingers === 5){
        changeIcon(document.getElementById("img"),"images/paper.png");
      }
  }



});

controller.connect();
