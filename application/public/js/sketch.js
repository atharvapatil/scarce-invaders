
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

let startTime;

let TIME = 50;

let preciseTimeRemaining = TIME;

let bgColour;

let startColour;
let targetColour;

function preload(){
  nasafont = loadFont('assets/nasalization.ttf');
}

function setup() {
  // colorMode(HSB);
  startColour = color(50,0,10);
  targetColour = color(0,10,50);
  
  
  bgColour = startColour;

  rectMode(CENTER);
  textFont(nasafont);


  //Instantiate server connection to handle all socket functions
  serverRoom = new ServerRoom();

  //Instantiare player object to handle information about this player

  sName = ["%^&*(%E?? ", "Galacticor ", "BattleZone ", "Redemptionator ", "Steve ", "Exterminex ", "Star Crusher ", "Ultimatron ", "Painbringer ", "CollapStar "]
  fName = ["Red ", "Dangerous ", "Super ", "Ultimate ", "Extreme ", "Electric ", "Light ", "Evil ", "Transcendent " ]

  myName = choice(fName) + choice(sName)
  player = new Player(myName + Math.floor(Math.random() * 100).toString());//TODO Replace with option to submit own name
  serverRoom.join();

  let cnv = createCanvas(window.innerWidth , window.innerHeight);

  spaceship = new Spaceship(createVector(width/2, height - 50));
  Enemy.createEnemies(10);

}

function draw() {

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


function handleBackground(){
  push();
  fill(bgColour);
  rect(0,0,width * pixelDensity(),height * pixelDensity());

  pop();

  handleColourChange();
}

function handleColourChange(){

  let t = (TIME - preciseTimeRemaining)  / TIME;

  bgColour = lerpColor(startColour, targetColour, t);
}

/////////
// HUD //
/////////

function HUD(){
  fill(255);

  textAlign(CENTER);
  textSize(36);

  text("Health: " + 100, width/2, 36);
  
  text("Ammo: " + spaceship.ammo, width/4, 36);

  //For testing
  //text("Accuracy: " + spaceship.accuracy, width/4, 36);

  if(leaderBoard){
    leaderBoard.display();
  }

  countdown();

  fill(255,0,0);
  textSize(18);
  text("You are: " + player.name, width*3/4, height - 50);

}
///////////////
// GAMELOOPS //
///////////////


let startLoop = () =>{
  background(bgColour);
  fill(255,0,0);
  rect(5,5,10,10);
  HUD();

  textAlign(CENTER);
  fill(255);
  text("Please wait for others to join the fight", width/2, height/2);
}



let gameLoop = () =>{
  handleBackground();

  fill(0,255,0);
  rect(5,5,10,10);

  intervalServerUpdate();


  spaceship.update();
  Laser.updateLasers();
  Enemy.updateEnemies();

  if(frameCount % 200 == 0){
    Enemy.createEnemies(3);
  }

  HUD();
}


let endLoop = () =>{
  background(targetColour);
  fill(0,0,255);
  rect(5,5,10,10);

  //For debugging, just reset
  //state = stateEnum.STARTSCREEN;

  HUD();
  if(leaderBoard){
    leaderBoard.displayEndScreen();
  }
}


let countdown = function(){
  if(state != stateEnum.GAME){
    return; // Only run clock during game;
  }

  textSize(42);
  textAlign(LEFT);

  preciseTimeRemaining = (startTime/1000 + TIME) - Date.now()/1000;
  let timeRemaining = (preciseTimeRemaining%100).toFixed(1);
  if(timeRemaining < 5){
    fill(255,0,0);
  }
  else if(timeRemaining < 10){
    fill(255,255,0);
  }
  else{
    fill(255);
  }
  text("Time Left: " + timeRemaining, width * 3/4 , 36);

  if(timeRemaining < 0){
    endGame();
  }
}

let endGame = function(){
  state = stateEnum.ENDCREEN;
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
  constructor(data){
    // {pname: pscore, pname2, pscore2 }
    this.players = data;
    this.array = [];
  }

  setScores(data){

    this.players = strToNum(data);
    
    this.array = sortByValue(this.players);
    //console.log(this.players);
  }



  display(){

    fill(255,255,0);

    for (let i = 0; i < this.array.length; i++) {
      name = this.array[i];

      textSize(18);
      textAlign(LEFT);
      text(name, 30, 20 * i + 100);
      
    }
  }

  displayEndScreen(){

    fill(255);


    for (let i = 0; i < this.array.length; i++) {
      if(player.name == this.array[i]){

      textSize(36);
      textAlign(CENTER);
      let place = parseInt(i)+1;
      text("Your Place: " + place, width/2, height/2);
      }
      
    }
  }
}
let strToNum = function(data){
  Object.keys(data).forEach(function(key){ data[key] = parseFloat(data[key])  });
  return data;
}

function sortByValue(list){
  let keysSorted = Object.keys(list).sort(function(a,b){return list[b]-list[a]})
  //console.log(keysSorted);  
  return keysSorted;
}


let choice =  function(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}