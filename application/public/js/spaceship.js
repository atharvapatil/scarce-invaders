
class Spaceship{

    constructor(pos){
      this.pos = pos;
      this.vel = createVector(0,0);
  
      this.acc = .4;
      this.w = 30;
    
      this.setAmmo();
      this.accuracy = "0";
    
      this.enemiesHit = 0;
      this.bulletsFired = 0;

    }

    reset(){

      this.acc = .4;
      this.w = 30;
    
      this.accuracy = 0;
    
      this.enemiesHit = 0;
      this.bulletsFired = 0;
    }

    setAmmo(val){
      this.ammo = player.ammo;
    }
  
    update(){
  
      this.control();
      this.move();
      this.bounds();
      this.render();
      this.calculateAccuracy();
      
    }
  
    fire(){
      if(this.ammo <= 0){
          return;
      }
      this.bulletsFired++;

      let laser = new Laser(  // New vector else laser moves ship
        createVector(this.pos.x, this.pos.y), 
        createVector(this.vel.x, this.vel.y));
      lasers.push(laser);
      this.ammo --;

    
    }
  
    calculateAccuracy(){
      if(this.bulletsFired == 0){
        return;
      }
        this.accuracy = (this.enemiesHit / this.bulletsFired).toFixed(2);
        player.setScore(this.accuracy);
    }
  
    control(){
      if(keyIsDown(LEFT_ARROW)){
        this.vel.x -= this.acc;
      }
      if(keyIsDown(RIGHT_ARROW)){
        this.vel.x += this.acc;
      }
    }
  
    move(){
      this.pos.add(this.vel);
      this.vel.mult(0.95);
    }
  
    bounds(){
      if(this.pos.x + this.w/2 > width){
        this.vel.mult(-0.5);
        this.pos.x = width-this.w/2;
      }
      if(this.pos.x - this.w/2 < 0){
        this.vel.mult(-0.5);
        this.pos.x = this.w/2;
      }
    }
  
    render(){
      
      fill(255);
      rect(this.pos.x, this.pos.y, this.w ,50);
    }
  }
  
 
  
  class Laser{

 
    static updateLasers(){
        for (let i = lasers.length-1; i >=0; i--) {
            let laser = lasers[i];
          
            laser.update();
            laser.render();
        
            if(laser.isOffScreen()){
              //Remove laser when offscreen
              //console.log("Splicing!");
              lasers.splice(i, 1);
              continue;
            }
        
            enemies.forEach(enemy => {
              if(laser.collision(enemy)){
                //HIT

                spaceship.enemiesHit++;
                enemies.splice(enemies.indexOf(enemy), 1);
                lasers.splice(i, 1);
                //return;
              }
            });
        };
    }

    constructor(pos, momentum){
      
      this.pos = pos;
      this.vel = createVector(0, -10).add(momentum);
  
      // console.log(this.pos);
      // console.log(this.vel);
      this.rad = 5;
    }
  
    update(){
      this.vel.x *= 0.95;
      this.pos.add(this.vel);
      this.render();
    }
  
    isOffScreen(){
      //console.log(" isOff: " + this.pos);
      if(this.pos.x < 0 || this.pos.x > width || this.pos.y < 0){
        return true;
      }
      return false;
    }
  
    collision(other){
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      
      if(d < this.rad + other.rad){
        return true;
      }
      return false;
    } 
  
    render(){
      noStroke();
      fill(0,255,0);
      ellipse(this.pos.x, this.pos.y, this.rad/2, this.rad/2);
    }
    
  }
  
  