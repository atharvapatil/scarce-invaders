let player;
let spaceship;
let enemies = [];
let lasers = [];

let nasafont;

let startTime;


let ammoChoices = [30,300];   //CHANGE THIS FOR AMMO AMOUNTS
let timePerRound = 30         //CHANGE THIS FOR ROUND TIMES
let TIME = timePerRound;
let preciseTimeRemaining = timePerRound;
let ammoPerRound;

let bgColour;
let startColour;
let targetColour;

let gameEngine;

function preload() {
  nasafont = loadFont('assets/nasalization.ttf');
}


function setup() {

  ammoPerRound = ammoChoices[ Math.round(random(0.0,1.0)) ];
  startColour = color(50, 0, 10);
  targetColour = color(0, 10, 50);
  bgColour = startColour;

  let cnv = createCanvas(window.innerWidth, window.innerHeight);

  rectMode(CENTER);
  textFont(nasafont);


  gameEngine = new GameEngine();
  player = new Player(); //TODO Replace with option to submit own name
  spaceship = new Spaceship(createVector(width / 2, height - 50));

  Enemy.createEnemies(10);


}

function draw() {
  handleBackground();

  background(bgColour);
  fill(255,0,0);
  rect(5,5,10,10);


  gameEngine.mainLoop();

}



/////////
// HUD //
/////////


///////////////
// GAMELOOPS //
///////////////



let endGame = function () {
  state = stateEnum.ENDCREEN;
}

/////////////
// CONTROL //
/////////////

// function intervalServerUpdate(){
//   if(frameCount % serverRoom.updateInterval == 0){ //TODO redo this as time function
//     serverRoom.sendAccuracy();
//   }
// }

function keyPressed() {
  if (key === ' ') {
    spaceship.fire();
  }

  //If a start screen:
  if(gameEngine.state%2 == 0 && keyCode === ENTER){
    gameEngine.advanceToNextRound();
  }
}

let strToNum = function (data) {
  Object.keys(data).forEach(function (key) { data[key] = parseFloat(data[key]) });
  return data;
}

function sortByValue(list) {
  let keysSorted = Object.keys(list).sort(function (a, b) { return list[b] - list[a] })
  //console.log(keysSorted);  
  return keysSorted;
}


let choice = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}