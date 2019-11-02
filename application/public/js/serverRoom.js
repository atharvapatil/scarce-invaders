
class ServerRoom{
    constructor(){
      this.updateInterval = 60; // In frames
      
      // Listen for start flag
      socket.on('begin', function () {
        startTime = Date.now();
        //Change state to play state!
        state = stateEnum.GAME;
        
        spaceship.setAmmo();
        spaceship.reset();
      });

      socket.on('end', function () {
        //Change state to play state!
        state = stateEnum.ENDCREEN;
      });

      socket.on('ammoSetup', function (data) {
        console.log("New Ammo: " + data);
        player.setAmmo(data);
        spaceship.setAmmo();
      });

      // Listen for score data
      socket.on('playersSetup', function (data) {
        leaderBoard = new LeaderBoard(data);
      });

      socket.on('playersUpdate', function (data) {
        
        leaderBoard.setScores(data);
      });
    }
  
    join(){
      socket.emit('playerinfo', {name: player.name})
    }

    sendAccuracy(){
      socket.emit("accuracy", player.getScore());
    }
  
    setNumPlayers(num){
      socket.emit('setNumPlayers', num)
    }
  }

