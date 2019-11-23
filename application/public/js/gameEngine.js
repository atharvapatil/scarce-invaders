
const states = {
  TUTORIAL_START: 0,
  TUTORIAL_GAME: 1,
  HIGH_START: 2,
  HIGH_GAME: 3,
  LOW_START: 4,
  LOW_GAME: 5,
  COLOURCHANGE_START: 6,
  COLOURCHANGE_GAME: 7,
  END: 8
}


class GameEngine {
  constructor() {
    this.state = states.TUTORIAL_START
  }

  setupNewRound() {
    startTime = Date.now();
    TIME = timePerRound;
    player.setAmmo(ammoPerRound[ (this.state+1) % states.END]);   //Use states to access index of list
    spaceship.reset();
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
      case states.HIGH_START:
        this.highAmmoStart();
        break;
      case states.HIGH_GAME:
        this.highAmmoGame();
        break;
      case states.LOW_START:
        this.lowAmmoStart();
        break;
      case states.LOW_GAME:
        this.lowAmmoGame();
        break;
      case states.COLOURCHANGE_START:
        this.colourChangeStart();
        break;
      case states.COLOURCHANGE_GAME:
        this.colourChangeGame();
        break;
      case states.END:
        this.finalScreen();
        break;
      default:
        console.log("No state: unclear what to do.")
        break;
    }
  }


  //ROUND 1
  tutorialStart() {
    HUD();
    tutStartHUD();
  }
  tutorialGame() {
    player.setAmmo(999);
    this.gameLoop();
    player.saveScore("tutorial")
  }

  //ROUND 2
  highAmmoStart() {
    this.startLoop();
    highAmmoHUD();
  } 
  highAmmoGame() {
    this.gameLoop();
    
    player.saveScore("highAmmo")
  }

  //ROUND 3
  lowAmmoStart() {
    this.startLoop();
    lowAmmoHUD();
  }
  lowAmmoGame() {
    this.gameLoop();
    player.saveScore("lowAmmo")
  }

  colourChangeStart() {
    this.startLoop();
    colourChangeHUD();
  }

  colourChangeGame() {
    handleBackgroundColourChange();
    this.gameLoop();
    player.saveScore("colourChange")
  }

  finalScreen() {
    this.startLoop();
    endHUD();

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
      Enemy.createEnemies(4);
    }

    this.countdown();
    lowAmmoChecker();
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



