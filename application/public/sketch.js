
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

let font;

function preload(){
  font = loadFont('assets/nasalization.ttf');
}

function setup() {

  rectMode(CENTER);
  textFont = font;
  textAlign(RIGHT);
  textSize(36);

  //Instantiate server connection to handle all socket functions
  serverRoom = new ServerRoom();

  //Instantiare player object to handle information about this player
  player = new Player("TestName" + Math.floor(Math.random() * 100).toString());//TODO Replace with option to submit own name
  serverRoom.join();

  createCanvas(1280, 720);

  spaceship = new Spaceship(createVector(width/2, height - 50));
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

function HUD(){
  fill(255);
  text("Health: " + 0, width/2, 20);

}

let startLoop = () =>{
  fill(255,0,0);
  rect(5,5,10,10);
}

let gameLoop = () =>{
  fill(0,255,0);
  rect(5,5,10,10);

  HUD();

  spaceship.update();
  Laser.updateLasers();
  Enemy.updateEnemies();

  if(frameCount % 200 == 0){
    Enemy.createEnemies(2);
  }
}


let endLoop = () =>{
  fill(0,0,255);
  rect(5,5,10,10);

  //For debugging, just reset
  state = stateEnum.STARTSCREEN;
  console.log("RESET");
}
  
function keyPressed() {
  if (key === ' ') {
    spaceship.fire();
  }

}



class Enemy{

  static createEnemies(num){
    for(let i = 0; i < num; i++){

      let pos = createVector(random(0, width), 0);
      let vel = createVector(random(-1,1), random(.1,2)); 

      let e = new Enemy(pos, vel);
      enemies.push(e);
    }
  }

  static updateEnemies(){

    for(let i = enemies.length-1; i >= 0; i--){
      let e = enemies[i];
      e.update();
      e.render();

      if(e.isOffScreen()){
        enemies.splice(i, 1);
      }
    }

  }
  constructor(pos, vel){
    this.pos = pos;
    this.vel = vel;

    this.rad = 20;
  }

  isOffScreen(){
    //console.log(" isOff: " + this.pos);
    if(this.pos.x < 0 || this.pos.x > width || this.pos.y > height){
      return true;
    }
    return false;
  }

  update(){
    this.pos.add(this.vel);
  }

  render(){
    fill(255,0,0);
    rect(this.pos.x, this.pos.y, this.rad*2, this.rad*2);

  }
}