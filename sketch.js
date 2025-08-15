function setup() {
  // Creates a canvas with a width of 600 pixels and a height of 400 pixels.
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // Sets the background color to a light grey.
  // The background() function takes a value from 0 (black) to 255 (white).
  background(220);
  // Check if the mouse is currently being pressed
  if (mouseIsPressed) {
    // If it is, set the fill color to red
    fill(255, 0, 0);
  } else {
    // If it's not, set the fill color to white
    fill(255);
  }
  noStroke();    // No outline

  // Draw the circle in the center
  circle(width / 2, height / 2, 50);
  // This function is called automatically whenever the browser window is resized
}

function windowResized() {
  // Resize the canvas to the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}