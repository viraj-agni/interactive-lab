function setup() {
  // Creates a canvas with a width of 600 pixels and a height of 400 pixels.
  createCanvas(600, 400);
}

function draw() {
  // Sets the background color to a light grey.
  // The background() function takes a value from 0 (black) to 255 (white).
  background(220);
    // Style the circle
  fill(255);      // White fill
  noStroke();    // No outline

  // Draw the circle in the center
  circle(width / 2, height / 2, 50);
}