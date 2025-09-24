function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
}

function draw() {
  background(255); // Set a white background
  
  // Move the origin (0,0) to the center of the screen
  translate(width / 2, height / 2);

  // --- Draw the Cartesian Grid ---
  
  let gridSize = 50; // The spacing between grid lines in pixels

  // Style the grid lines
  stroke(220); // Light grey color for the grid
  strokeWeight(1);

  // Draw vertical grid lines from the center out
  for (let x = 0; x < width / 2; x += gridSize) {
    line(x, -height / 2, x, height / 2); // Positive x-axis
    line(-x, -height / 2, -x, height / 2); // Negative x-axis
  }

  // Draw horizontal grid lines from the center out
  for (let y = 0; y < height / 2; y += gridSize) {
    line(-width / 2, y, width / 2, y); // Positive y-axis
    line(-width / 2, -y, width / 2, -y); // Negative y-axis
  }

  // --- Draw the main axes (thicker and darker) ---
  stroke(0); // Black color for the axes
  strokeWeight(2);
  
  // X-axis
  line(-width / 2, 0, width / 2, 0);
  
  // Y-axis
  line(0, -height / 2, 0, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}