const g = -9.8; //gravity (m/s)
const dt = 0.0002; //time step
const ar = 100; //air resistance
const s = 0.3;

let pendulums = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  for (let i = 0; i < 1; i++) {
    pendulums.push(new Pendulum(1, 0.2, 1));
  }
}

function draw() {
  background(10);
  
  for (let i = 0; i < pendulums.length; i++) {
    pendulums[i].update();
    pendulums[i].render();
  }
}