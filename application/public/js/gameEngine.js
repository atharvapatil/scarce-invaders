
const states = {
  TUTORIAL_START: 0,
  TUTORIAL_GAME: 1,
  UNINFORMED_START: 2,
  UNINFORMED_GAME: 3,
  INFORMED_START: 4,
  INFORMED_GAME: 5,
  END: 6
}


class GameEngine {
  constructor() {
    this.state = states.TUTORIAL_START
  }

  setupNewRound() {
    startTime = Date.now();
    TIME = 30;
    player.setAmmo(30);
    spaceship.setAmmo();
  }

  setState(newState) {
    this.state = newState;
  }

  mainLoop() {
    switch (this.state) {
      case states.TUTORIAL_START:
        this.tutorialStart();
        break;
      case states.TUTORIAL_GAME:
        this.tutorialGame();
        break;
      case states.UNINFORMED_START:
        this.uninformedStart();
        break;
      case states.UNINFORMED_GAME:
        this.uninformedGame();
        break;
      case states.INFORMED_START:
        this.informedStart();
        break;
      case states.INFORMED_GAME:
        this.informedGame();
        break;
      case states.END:
        this.finalScreen();
        break;
      default:
        console.log("No state: unclear what to do.")
        break;
    }
  }


  tutorialStart() {
    HUD();
    tutStartHUD();
    
  }


  tutorialGame() {
    player.setAmmo(1000);
    this.gameLoop();
  }

  uninformedStart() {
    this.startLoop();
    unInfStartHUD();
  } 

  uninformedGame() {
    this.gameLoop();
  }

  informedStart() {
    this.startLoop();
    
    infStartHUD();
  }

  informedGame() {
    handleBackgroundColourChange();
    this.gameLoop();
  }

  finalScreen() {
    this.startLoop();
    //show scores here
  }

  gameLoop() {
    //Generic loop for all games

    fill(0, 255, 0);
    rect(5, 5, 10, 10);

    spaceship.update();
    Laser.updateLasers();
    Enemy.updateEnemies();

    if (frameCount % 200 == 0) {
      Enemy.createEnemies(3);
    }

    this.countdown();
    HUD();
  }


  startLoop(){
    background(bgColour);
    fill(0, 0, 255);
    rect(5, 5, 10, 10);
    HUD();

  }

  countdown() {
    textSize(42);
    textAlign(LEFT);

    preciseTimeRemaining = (startTime / 1000 + TIME) - Date.now() / 1000;
    let timeRemaining = (preciseTimeRemaining % 100).toFixed(1);

    if (timeRemaining < 5) {
      fill(255, 0, 0);
    }
    else if (timeRemaining < 10) {
      fill(255, 255, 0);
    }
    else {
      fill(255);
    }
    displayTime(timeRemaining);

    if (timeRemaining < 0) {
      this.advanceToNextRound();
    }
  }


  advanceToNextRound() {
    
    //record scores here;
    this.setupNewRound();
    enemies = [];
    lasers = []
    this.state += 1;
  }
}



// this.updateInterval = 60; // In frames

// // Listen for start flag
// socket.on('begin', function () {
//   startTime = Date.now();
//   //Change state to play state!
//   state = stateEnum.GAME;

//   spaceship.setAmmo();
//   spaceship.reset();
// });

// socket.on('end', function () {
//   //Change state to play state!
//   state = stateEnum.ENDCREEN;
// });

// socket.on('ammoSetup', function (data) {
//   console.log("New Ammo: " + data);
//   player.setAmmo(data);
//   spaceship.setAmmo();
// });

// socket.on('timeSetup', function (data) {
//   console.log("New Time: " + data);
//   TIME = data;
//   // spaceship.setAmmo();
// });

// // Listen for score data
// socket.on('playersSetup', function (data) {
//   leaderBoard = new LeaderBoard(data);
// });

// socket.on('playersUpdate', function (data) {

//   leaderBoard.setScores(data);
// });
// }

// join(){
// socket.emit('playerinfo', {name: player.name})
// }

// sendAccuracy(){
// socket.emit("accuracy", player.getScore());
// }

// setNumPlayers(num){
// socket.emit('setNumPlayers', num)
// }


