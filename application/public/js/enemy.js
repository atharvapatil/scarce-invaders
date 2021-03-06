

class Enemy{

    static createEnemies(num){
      for(let i = 0; i < num; i++){
  
        let pos = createVector(random(0, width), 0);
        let vel = createVector(random(-1,1), random(.1,4)); 
  
        let e = new Enemy(pos, vel);
        enemies.push(e);
      }
    }

    static clearEnemies(){
      enemies = [];
    }
  
    static updateEnemies(){
  
      for(let i = enemies.length-1; i >= 0; i--){
        let e = enemies[i];
        e.update();
        e.render();
  
        if(e.isOffScreen()){
          enemies.splice(i, 1);
        }
      }
  
    }
    constructor(pos, vel){
      this.pos = pos;
      this.vel = vel;
  
      this.rad = 20;
    }
  
    isOffScreen(){
      if(this.pos.x < 0 || this.pos.x > width || this.pos.y > height){
        return true;
      }
      return false;
    }
  
    update(){
      this.pos.add(this.vel);
    }
  
    render(){
      fill(255,255,0);
      let r = this.rad;
      triangle(
          this.pos.x , this.pos.y+r, 
         this.pos.x - r, this.pos.y-r,
         this.pos.x + r, this.pos.y - r);
    }
  }