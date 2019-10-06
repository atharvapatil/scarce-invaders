
class Player{
    constructor(name){
      this.name = name;
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
  }
  