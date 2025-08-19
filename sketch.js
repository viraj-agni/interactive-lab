// --- Variables for the sine wave ---
let waveHistory = []; // Array to store the history of y-values
let angle = 0;
let amplitude = 75; // How tall the wave is
let waveWidth = 500; // How long the wave is on screen

function setup() {
  // Creates a canvas with a width of 600 pixels and a height of 400 pixels.
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  // 1. Move the origin to the center
  translate(width / 2, height / 2);

  // 2. Calculate the mouse's position and distance relative to the center
  let relativeMouseX = mouseX - width / 2;
  let relativeMouseY = mouseY - height / 2;
  let distance = dist(0, 0, relativeMouseX, relativeMouseY);

  // 3. Calculate the angle using atan2 along with its sin and cos 
  let angle = atan2(-relativeMouseY, relativeMouseX);// Note: Invert Y to match the cartesian coordinate system
  let sinValue = sin(angle);
  let cosValue = cos(angle);
  let radius = height/3

  // --- Visualization ---
  
  // Draw the axes for context
  stroke(150);
  strokeWeight(1);
  line(-width / 2, 0, width / 2, 0); // x-axis
  line(0, -height / 2, 0, height / 2); // y-axis

  // draw a circle at the center
  fill(255); // White fill for the circle
  noStroke(); // No outline for the circle;
  circle(0, 0, 2 * radius); // Draw a circle at the center

  // Draw the mouse position as a small circle
  fill(255, 0, 0, 150);  
  stroke(1);
  strokeWeight(8);
  point(relativeMouseX, relativeMouseY, 5); // Draw a point at the mouse position

  // Draw the line AND display the text if the mouse is clicked
if (mouseIsPressed) {
  // --- Part 1: Draw the right angled triangle ---
  stroke(0);
  strokeWeight(2);
  line(0, 0, radius*cosValue, -radius*sinValue); // hypotenuse
  line(0, 0, radius*cosValue, 0); // horizontal line
  line(radius*cosValue, -radius*sinValue, radius*cosValue, 0); // vertical line

  
  // --- Part 2: Display the text ---
  noStroke();
  fill(0);
  textSize(24);
  
  let angleDegrees = degrees(angle);
  text("Angle: " + angleDegrees.toFixed(2) + "°", 10, 40);

  
}
  // Display the distance from the center
  noStroke();
  fill(0, 0, 255);
  textSize(24);
  text("Distance: " + distance.toFixed(2), -width/2 + 40, -height/2 + 40);
  text("Sin: " + sinValue.toFixed(2), -width/2 + 40, -height/2 + 80);
  text("Cos: " + cosValue.toFixed(2), -width/2 + 40, -height/2 + 120);
}

function windowResized() {
  // Resize the canvas to the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}