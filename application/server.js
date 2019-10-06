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


let Activate = function(){
  //Activate runs once server is setup

  playerHandler = new PlayerHandler();

}


// Create socket connection
let io = require('socket.io').listen(server);

// Listen for clients to connect
io.on('connection', function (socket) {
  console.log('A client connected: ' + socket.id);

  socket.on('setNumPlayers', function (data) {
    playerHandler.updateRequiredPlayers(data);
  });

  // Add new player to list of players.
  socket.on('playerinfo', function (data) {
    let player = new Player(socket.id, data.name);
    playerHandler.addPlayer(player);
  });

  // Listen for this client to disconnect
  socket.on('disconnect', function () {
    //If id is associated with player, remove player from list.
    playerHandler.removePlayerByID(socket.id);
    console.log("A client has disconnected " + socket.id);
  });
});



class PlayerHandler{
  //Loop through all connections and create player objects
  constructor(){
    this.players = [];
    this.requiredPlayers = 10;
  }
  updateRequiredPlayers(num){
    this.requiredPlayers = num;
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
    this.score - score;
  }

  getScore(){
    return this.score;
  }

  getName(){
    return this.name;
  }
}