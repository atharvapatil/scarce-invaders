class PopCorn {
    constructor(x, y, diameter) {
      this.diameter = diameter;
      this.x = x
      this.y = y
      this.speed = 2; 
      this.img = loadImage('popcorn.png');
    }

    show() {
      image(this.img,this.x, this.y,this.diameter,this.diameter);
    }

    move() {
      this.show();
			this.y -= this.speed;
    }
    
    // intersects(other) {
    //   let d = dist(this.x, this.y, other.x, other.y)
    //   return (d < this.r * this.m + other.r * other.m);
    // }
    
  }