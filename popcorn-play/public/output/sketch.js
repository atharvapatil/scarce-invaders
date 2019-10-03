// Open and connect input socket
let socket = io('/output');

// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

// Keep track of users
let tilt, shake;

let shoot;
let popCornArray = [];
let candyArray = [];
let curtain;
let x;
let tiltData, bagPos;

function setup() {

  // Listen for tilt data
  socket.on('tilt', function (data) {
    tilt = data;
  });

  // Listen for shake data
  socket.on('shake', function (data) {
    shake = data;
  });

  createCanvas(600, 400);
  curtain = loadImage('curtain.jpg');
  bag = new Bag(100, height - 120);
  candy=new Target(10, 20);
  candyArray.push(candy);
  console.log('setup complete')
}

function mousePressed() {
  popC();
}

function popC() {
  popCorns = new PopCorn(bag.x + 80, height - 120, random(20, 30));
  popCornArray.push(popCorns);
}

function newTarget() {
    if(candyArray.length > 0){
      candyArray.pop(candy)
      candy = new Target(10, 20);
      candyArray.push(candy);
      console.log('run')
    }
}

function draw() {
  background(220);
  image(curtain, 0, 0);

  if(tilt){
    tiltData = tilt.x

    console.log(tiltData);

    bagPos = map(tiltData, 0, 90, 20, 600);

    // console.log(bagPos);

    playerX = bagPos - 80
    bag.x = playerX;
    bag.show();
  }
  if(shake){
    popC();
  }

  for(let i = 0; i < popCornArray.length; i++) {
    popCornArray[i].move();
    let d = dist(popCornArray[i].x, popCornArray[i].y, candyArray[0].x, candyArray[0].y)

  	if(d<40) {
      newTarget()
      candyArray.splice();
      console.log('hit')
    }

  }

  for(let i = 0; i < candyArray.length; i++) {
    candyArray[i].move();
  }

  // Reset tilt and shake for next frame
  // tilt = null;
  shake = null;

}
