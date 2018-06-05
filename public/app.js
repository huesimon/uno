var socket;
var joinButton;
var joinGameButton;
var buttons = new Array(6);
var buttonArray = [];
var playerList = new Array(4);
var canvasWidth = 600;
var canvasHeight = 800;
var playerList;
var me;
var myHand=[];
var textArray=[];



function setup() {
  //////////////////////////////////////////////////////////////
  ///////////////////the actually socket connection////////////
  socket = io.connect('http://localhost:3000/');
  console.log("hello" + socket.id);
  socket.on('getHand', getHand);

  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  //p5.js canvas
  createCanvas(canvasWidth, canvasHeight);
  background(255);
  createButtons();
  joinGameButton = createButton('Start Game');
  joinGameButton.position(canvasWidth / 2, canvasHeight - 100);
  joinGameButton.mousePressed(joinButtonPressed);
  console.log(canvasWidth + " x " + canvasHeight);
  console.log("max players = " + playerList.length );

}

function draw() {
  //p5 function

}

function testFunction() {
  console.log("button pressed" + "x: " + this.x + " y: " + this.y);
  findButton(this.x,this.y);


}


function createButtons() {
  for (x = 0; x < playerList.length; x++) {
    //4 players
    let yArray=[40,140,240,340];
    textArray[x]= text("player "+x, 40, yArray[x]);
    /*
      text("player0", 40, 40);
      text("player1", 40, 140);
      text("player2", 40, 240);
      text("player3", 40, 340);
      */

    for (var i = 0; i < buttons.length; i++) {
      buttons[i] = createButton('card:' + i);
      buttons[i].position(i * 100 + 50, x * 100 + 50);
      buttons[i].mousePressed(testFunction);
      buttonArray.push( buttons[i]);
    }
  }
}

function findButton(x, y) {
  //playerList[0] can use buttons on x= ? , y=50
  //playerList[1] can use buttons on x= ? , y=150
  //...
  console.log(x,y);
  //find button in array
  for (var i = 0; i < buttonArray.length; i++) {
    if (buttonArray[i].x == x && buttonArray[i].y == y ) {
      console.log('WOOHOO');
      var data = {
            x: x,
            y: y,
            id: socket.id
          };
      socket.emit('buttonPressed', data);
    }
  }
}

function joinButtonPressed() {
  console.log(socket.id);
  me = socket.id;
  var data = {
            id: socket.id
        };
        socket.emit('joinGame', data);
}

function getHand(hand) {
  if (hand.playerId == me) {
    myhand = hand;
    console.log('my hand');
    console.log(hand);
    console.log('________________________');
  }
  console.log(hand);
}

function setCardText(hand) {
  for (var i = 0; i < playerList.length; i++) {
    if (playerList[i] == me) {

    }
  }

}
