
// Open and connect input socket
let socket = io();
console.log("Arrived")
// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

// Use enum to track which stage of the game we're in
let stateEnum =  {STARTSCREEN:0, GAME:1, ENDCREEN:2}
let state = stateEnum.STARTSCREEN;  

let player;
let serverRoom;
let spaceship;
let enemies = [];
let lasers = [];
let leaderBoard;

let nasafont;

function preload(){
  nasafont = loadFont('assets/nasalization.ttf');
}

function setup() {

  rectMode(CENTER);
  textFont(nasafont);
  textAlign(CENTER);
  textSize(36);

  //Instantiate server connection to handle all socket functions
  serverRoom = new ServerRoom();

  //Instantiare player object to handle information about this player
  player = new Player("TestName" + Math.floor(Math.random() * 100).toString());//TODO Replace with option to submit own name
  serverRoom.join();

  createCanvas(1280, 720);

  let ammo = 25;
  spaceship = new Spaceship(createVector(width/2, height - 50), ammo);
  Enemy.createEnemies(10);

}

function draw() {
  background(20);

  switch(state){
    case stateEnum.STARTSCREEN:
      startLoop();
      break;
    case stateEnum.GAME:
      gameLoop();
      break;
    case stateEnum.ENDCREEN:
      endLoop();
      break;
    default:
      console.log("No state: unclear what to do.")
      break;
  }
}

/////////
// HUD //
/////////

function HUD(){
  fill(255);
  text("Health: " + 100, width/2, 36);
  
  text("Ammo: " + spaceship.ammo, width*3/4, 36);

  //For testing
  text("Accuracy: " + spaceship.accuracy, width/4, 36);

  if(leaderBoard){
    
  }

}

let startLoop = () =>{
  fill(255,0,0);
  rect(5,5,10,10);
}

//////////////
// GAMELOOP //
//////////////

let gameLoop = () =>{
  fill(0,255,0);
  rect(5,5,10,10);

  intervalServerUpdate();


  spaceship.update();
  Laser.updateLasers();
  Enemy.updateEnemies();

  if(frameCount % 200 == 0){
    Enemy.createEnemies(2);
  }

  HUD();
}


let endLoop = () =>{
  fill(0,0,255);
  rect(5,5,10,10);

  //For debugging, just reset
  state = stateEnum.STARTSCREEN;
  console.log("RESET");
}


/////////////
// CONTROL //
/////////////

function intervalServerUpdate(){
  if(frameCount % serverRoom.updateInterval == 0){ //TODO redo this as time function
    serverRoom.sendAccuracy();
  }
}

function keyPressed() {
  if (key === ' ') {
    spaceship.fire();
  }

}



class LeaderBoard {
  constructor(array){

  }
}