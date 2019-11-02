// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
  Activate();
});

// Tell server where to look for files
app.use(express.static('public'));

//Global Vars:
let playerHandler;
let playing = false;
let scoreUpdater;


let Activate = function(){
  //Activate runs once server is setup
  playerHandler = new PlayerHandler();

}

let initialReqPlayers = 25;
let count = 1;

// Create socket connection
let io = require('socket.io').listen(server);

// Listen for clients to connect
io.on('connection', function (socket) {
  ///////////////////////
  // PLAYER CONNECTIONS//
  ///////////////////////
  console.log('A client connected: ' + socket.id);

  console.log("SENDING AMMO");

  if(count % 2 == 0){
    setTimeout(function(){
      socket.emit("ammoSetup", 30)}, 500);
  }else{
    setTimeout(function(){
      socket.emit("ammoSetup", 200)}, 500);
  }
  count++;

  socket.on('setNumPlayers', function (data) {
    playerHandler.setRequiredPlayers(data);
    tryStartGame();
    tryEndGame();
  });

  // Add new player to list of players.
  socket.on('playerinfo', function (data) {
    let player = new Player(socket.id, data.name);
    playerHandler.addPlayer(player);  
    console.log("Num Players is now: " + playerHandler.getNumPlayers());
    console.log("Req Players is now: " + playerHandler.getRequiredPlayers());
    
    tryStartGame();
    
  });

  socket.on('accuracy', function (data) {
    
    playerHandler.tryUpdateScore(socket.id, data);
    
  });


  // Listen for this client to disconnect
  socket.on('disconnect', function () {
    //If id is associated with player, remove player from list.
    playerHandler.removePlayerByID(socket.id);
    console.log("A client has disconnected " + socket.id);
    tryEndGame();
  });
});

let tryStartGame = () => {
  //When enough players connect (and we're not already playing), start!
  if(playerHandler.getRequiredPlayers() <= playerHandler.getNumPlayers() ){
    if(playing == false){
      console.log("Starting Game!")
      setTimeout(startGame, 500);
      
    }else{
      console.log("Game Already Started!")
    }
  }
}

let tryEndGame = () => {
  //When enough players connect (and we're not already playing), start!
  if(playerHandler.getRequiredPlayers() > playerHandler.getNumPlayers() ){
    console.log("Ending Game")
    endGame();
  }
}

let startGame = function(){
  playing = true;

  playerHandler.reset();
  io.emit("begin");
  io.emit("playersSetup", playerHandler.getSendableMessage())
  scoreUpdater = setInterval(updateScore, 1000)
}
let endGame = function(){
  playerHandler.setRequiredPlayers(100);
  playing = false;
  io.emit("end");
  clearInterval(scoreUpdater);
}


function updateScore(){
  io.emit("playersUpdate", playerHandler.getSendableMessage());
}

class PlayerHandler{
  //Loop through all connections and create player objects
  constructor(){
    this.players = [];
    this.requiredPlayers = initialReqPlayers;
  }
  reset(){
    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      player.updateScore(0);
    }
  }
  
  addPlayer(player){
    console.log("New player: " + player.name);
    this.players.push(player);
    this.printPlayers();
  }

  removePlayerByID(id){
    let indexToRemove = -1;
    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      if(player.id == id){
        indexToRemove = i;
      }
    }
    if(indexToRemove > -1){
      console.log("Player left: " + this.players[indexToRemove].name);
      this.players.splice(indexToRemove, 1);
      this.printPlayers();
    }
  }

  tryUpdateScore(id, data){
    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      if(player.id == id){
        console.log(player.name + ": accuracy: " + data);
        player.updateScore(data);
      }
    }
  }

  getSendableMessage(){
    let result = {};

    this.players.forEach(player => {
      let name = player.name;
      result[name] = player.score;
    });

    return result;
  }
  // Getters and Setters

  getNumPlayers(){
    return this.players.length;
  }

  getRequiredPlayers(){
    return this.requiredPlayers;
  }

  setRequiredPlayers(num){
    this.requiredPlayers = num;
  }

  // Output Functions

  printPlayers(){
    console.log("PLAYER LIST:")
    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      console.log("Player: " + i + ": " + player.name);
    }
  }
}

class Player{
  constructor(id, name){
    this.id = id;
    this.name = name;
    this.score = 0;
  }

  updateScore(score){
    this.score = score;
  }

  getScore(){
    return this.score;
  }

  getName(){
    return this.name;
  }
}