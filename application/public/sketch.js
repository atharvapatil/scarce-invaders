// Open and connect input socket
let socket = io();
console.log("Arrived")
// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

function setup() {

  // Listen for tilt data
  socket.on('begin', function (data) {
    tilt = data;
  });

  // Listen for shake data
  socket.on('timeUpdate', function (data) {
    shake = data;
  });

  createCanvas(600, 400);

}






function draw() {
  background(20);
  
}
