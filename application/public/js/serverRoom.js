
class ServerRoom{
    constructor(){
      this.updateInterval = 60; // In frames
      
      // Listen for start flag
      socket.on('begin', function () {
        //Change state to play state!
        state = stateEnum.GAME;
      });
      // Listen for start flag
      socket.on('end', function () {
        //Change state to play state!
        state = stateEnum.ENDCREEN;
      });
  
      // Listen for score data
      socket.on('score', function (data) {
        
      });

      // Listen for score data
      socket.on('playersetup', function (data) {
        leaderBoard = new LeaderBoard(data);
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

