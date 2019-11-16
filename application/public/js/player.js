
class Player{
    constructor(){
      this.name = Player.setName();
      this.score = "0.00";
      this.ammo = 25;
    }

    setAmmo(val){
      console.log("Setting Ammo: " + val);
      this.ammo = val;
      spaceship.setAmmo();
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

    static setName(){
      let sName = ["%^&*(%E?? ", "Galacticor ", "BattleZone ", "Redemptionator ", "Steve ", "Exterminex ", "Star Crusher ", "Ultimatron ", "Painbringer ", "CollapStar "]
      let fName = ["Red ", "Dangerous ", "Super ", "Ultimate ", "Extreme ", "Electric ", "Light ", "Evil ", "Transcendent " ]

      let name = choice(fName) + choice(sName)

      return name + Math.floor(Math.random() * 100).toString()
    }
  
  }
  