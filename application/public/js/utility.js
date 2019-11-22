function HUD() {
    fill(255);

    textAlign(CENTER);
    textSize(36);

    // text("Health: " + 100, width / 2, 36);

    text("Ammo: " + spaceship.ammo, width / 4, 36);

    fill(255, 0, 0);
    textSize(18);
    text("You are: " + player.name, width * 3 / 4, height - 50);

}

function displayTime(t) {
    text("Time Left: " + t, width * 3 / 4, 36);
}


function handleBackground(){
    push();
    fill(bgColour);
    rect(0,0,width * pixelDensity(),height * pixelDensity());
    pop();

  
  }
  
  function handleBackgroundColourChange(){
    let t = (TIME - preciseTimeRemaining)  / TIME;
    bgColour = lerpColor(startColour, targetColour, t);
  }
  


  function tutStartHUD(){
      
  textSize(48);
    textAlign(CENTER);
    fill(255);
    text("Use the left and right ARROW KEYS to move your ship\n" +
      "Hit SPACE to fire laserbeams\n\n" +
      "Press ENTER to begin a tutorial round.",
      width / 2, height / 2);
}


function lowAmmoChecker(){
    if(spaceship.ammo < 10){
        textSize(48);
        textAlign(CENTER);
  
        fill(255,0,0);
        text("LOW AMMO",
        width / 2, height / 2);
    }

  }

function unInfStartHUD(){
    
  textSize(48);
    textAlign(CENTER);
    fill(255);
    text("Congratulations, you are now prepared to fight for real!\n" +
      "You have " + player.ammo + " lasers this next round. Good luck!\n" + 
      "Press ENTER to play for realz",
      width / 2, height / 2);

    
}


function infStartHUD(){
    
  textSize(48);
    textAlign(CENTER);
    fill(255);
    text("Congratulations, you survived the first wave!\n" +
      "Your score, based on your ACCURACY, is: " + player.score + "\n\n" + 
      "Ready to go again? \n"+  
      "Press ENTER to begin the final round.",
      width / 2, height / 2);
}

function endHUD(){
    
  textSize(48);
    textAlign(CENTER);
    fill(255);
    text("The Game is over. Your scores each round were:",
      width / 2, height / 2);

    let scores = player.getTotalScore();
    text("Tutorial round: " + scores["tutorial"],
    width / 2, height / 2 + 50);
    text("First round: " + scores["uninformed"],
    width / 2, height / 2 + 100);
    text("Second round: " + scores["informed"],
    width / 2, height / 2 + 150);

}


////////////////////
// SCORING SYSTEM //
////////////////////

/////////////////
// LEADERBOARD //
/////////////////

class LeaderBoard {
    constructor(data) {
        // {pname: pscore, pname2, pscore2 }
        this.players = data;
        this.array = [];
    }

    setScores(data) {

        this.players = strToNum(data);

        this.array = sortByValue(this.players);
        //console.log(this.players);
    }



    display() {

        fill(255, 255, 0);

        for (let i = 0; i < this.array.length; i++) {
            name = this.array[i];

            textSize(18);
            textAlign(LEFT);
            text(name, 30, 20 * i + 100);

        }
    }

    displayEndScreen() {

        fill(255);


        for (let i = 0; i < this.array.length; i++) {
            if (player.name == this.array[i]) {

                textSize(36);
                textAlign(CENTER);
                let place = parseInt(i) + 1;
                text("Your Place: " + place, width / 2, height / 2);
            }

        }
    }
}