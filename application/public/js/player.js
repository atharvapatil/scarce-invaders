
class Player{
    constructor(){
      this.name = Player.setName();
      this.score = 0;
      this.ammo = 999;    //Start Case

      this.totalScores = {};
    }

    setAmmo(val){
      console.log("Setting Ammo: " + val);
      this.ammo = val;
      spaceship.setAmmo();
    }

    resetScore(){
      this.score = 0;
    }

    getName(){
      return this.name;
    }
    getScore(){
      return this.score;
    }
    setScore(val){
      this.score = val;
    }

    saveScore(round){
      this.totalScores[round] = this.score;
    }

    getTotalScore(round){
      return this.totalScores;
    }

    static setName(){
      let sName = ["%^&*(%E?? ", "Galacticor ", "BattleZone ", "Redemptionator ", "Steve ", "Exterminex ", "Star Crusher ", "Ultimatron ", "Painbringer ", "CollapStar "]
      let fName = ["Red ", "Dangerous ", "Super ", "Ultimate ", "Extreme ", "Electric ", "Light ", "Evil ", "Transcendent " ]

      let name = choice(fName) + choice(sName)

      return name + Math.floor(Math.random() * 100).toString()
    }
  
  }
  