 
class Target {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.speed = 2;
      this.img = loadImage('candy.png');
    }

    show() {
      image(this.img,this.x, this.y,53,52);
    }

    move() {
      this.show();
			
      if (this.x>width-53){
        this.speed= this.speed*-1;
      }else if (this.x<0){
       this.speed= this.speed*-1;
      }
      this.x += this.speed;
    }
    
  }