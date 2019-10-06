// Open and connect input socket
let socket = io();
console.log("Arrived")
// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});


let State =  {STARTSCREEN:0, GAME:1, ENDCREEN:2}

let player;

function setup() {

  let rando = Math.floor(Math.random() * 100);
  player = new Player("TestName" + rando.toString());

  socket.emit('playerinfo', {name: player.name})
  // Listen for tilt data
  socket.on('begin', function (data) {
  });

  // Listen for shake data
  socket.on('score', function (data) {
    shake = data;
  });

  createCanvas(600, 400);

}

function draw() {
  background(20);
}


class Player{
  constructor(name){
    this.name = name;
    this.score = 0;
  }

  getName(){
    return this.name;
  }
  getScore(){
    return this.score;
  }
}


