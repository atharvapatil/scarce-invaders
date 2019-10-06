
class ServerRoom{
    constructor(){
      
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
    }
  
    join(){
      socket.emit('playerinfo', {name: player.name})
    }
  
    setNumPlayers(num){
      socket.emit('setNumPlayers', num)
    }
  }