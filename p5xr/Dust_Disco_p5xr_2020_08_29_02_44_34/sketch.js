var cloud = [];
var dustCount = 30;
let perceptionRadius = 300;
let depth = 400;
let tickRate = 12;

let settings = {
  stage: {
    width: 10,
    height: 10,
    depth: 10
  }
};

let sliderValues = {
  separation: 1,
  cohesion: 1,
  align: 1
};

let avatar = {
  x: 0,
  y: 0,
  z: 0
}


function preload() {
  createVRCanvas();
}

function setup() {
  setVRBackgroundColor(10, 10, 10); // Necessary to redraw background color to prevent motion sickness.
  frameRate(tickRate);

  // Create dust data.
  for (let i = 0; i < dustCount; i++) {
    cloud.push(new dust());
  }
}

function calculate() {
  // Things you want to happen once per frame
  for (let dust of cloud) {
    dust.show();
    dust.edges();
    dust.cloud(cloud);
    dust.connect();
    dust.update();
  }
}

function draw() {
  setViewerPosition(avatar.x, avatar.y, avatar.z);
  for (let dust of cloud) {
    dust.show();
    dust.edges();
    dust.cloud(cloud);
    dust.connect();
    dust.update();
  }
}
