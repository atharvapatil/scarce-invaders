 
class Bag {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.img = loadImage('popcornBag.png');
    }

    show() {
      image(this.img,this.x, this.y,180,120);
    }
    
  }