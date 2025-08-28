function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(220);

    // 1. Move the origin to the center
    translate(width / 2, height / 2);

    // 2. Draw axes for reference
  stroke(0, 0, 0, 100); // Black with some transparency
  line(-width / 2, 0, width / 2, 0); // x-axis
  line(0, -height / 2, 0, height / 2); // y-axis

  // 3. Start drawing the parabola

  // 3.1 Style the line
  noFill();
  stroke(255, 0, 0); // Red color
  strokeWeight(2);

  // 3.2 Begin the shape
  beginShape();

  // 3.3 Assign a scale factor for the parabola. 
  // This scale factor controls the "zoom" of the parabola
  let scale = 200;

  // 3.4 Loop through x values to create the parabola
    for (let x = -width / 2; x < width / 2; x += 1) {
        // Calculate the y value using the parabola equation y = ax^2
        let y = (x * x) / scale;
    
        // Map the x and y values to the canvas
        vertex(x, -y); // Invert y to match the cartesian coordinate system
    }
    // 3.5 End the shape
    endShape();

    // 4. Draw the mouse position as a small circle

    let relativeMouseX = mouseX - width / 2;
    let relativeMouseY = relativeMouseX * relativeMouseX / scale; // Calculate y based on the parabola equation
    let slope = (2 * relativeMouseX) / scale; // Calculate the slope at the mouse position

    noStroke(); // No outline for the circle
    fill(0, 0, 255, 150); // Blue with some transparency
    circle(relativeMouseX, -relativeMouseY, 10); // Draw a circle at the mouse position
  
  if(mouseIsPressed){
    // 5. Draw the tangent line at the mouse position

    // 5.1 Calculate the angle of the slope
    let angle = -atan(slope);

    // 5.2 Calculate the length of the tangent line
    let tangentLength = 300;

    // 5.3 Calculate the end points of the tangent line
    let x1 = relativeMouseX - (tangentLength / 2) * cos(angle);
    let y1 = -relativeMouseY - (tangentLength / 2) * sin(angle);
    let x2 = relativeMouseX + (tangentLength / 2) * cos(angle);
    let y2 = -relativeMouseY + (tangentLength / 2) * sin(angle);

    // 5.4 Draw the tangent line
    stroke(0, 255, 0); // Green color
    strokeWeight(2);
    line(x1, y1, x2, y2);

    // 6. Display the slope value
    noStroke();
    fill(0);
    textSize(24);
    text("Slope: " + slope.toFixed(2), 10 - width / 2, 40 - height / 2);
  } 
}
