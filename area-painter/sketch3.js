// Global variables
let a, b, N;
let deltaX;

// Global variables for HTML elements
let nSlider;
let nValueDisplay;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // --- Connect to and configure HTML elements ---
  nSlider = select('#nSlider');
  nValueDisplay = select('#nValueDisplay');
  nSlider.input(() => { // Define what happens on future interactions
    N = nSlider.value();
    deltaX = (b - a) / N;
    nValueDisplay.html(N);
  });

  // --- Initialize sketch variables ---
  a = -200;
  b = 200;
  N = nSlider.value(); // Read the slider's initial value
  deltaX = (b - a) / N;

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
        let y = parabola(x) / scale;
    
        // Map the x and y values to the canvas
        vertex(x, -y); // Invert y to match the cartesian coordinate system
    }
    // 3.5 End the shape
    endShape();

    // 4. Draw the Riemann Rectangles under the curve
  
        // Style the rectangles
    fill(150, 180, 255, 200); // Light blue with some transparency
    stroke(255); // White border

    // Loop to calculate and draw each rectangle
    for (let i = 0; i < N; i++) {
        const x = a + i * deltaX;
        const y_height = parabola(x) / 200; // Use the scale factor here

        // Draw the rectangle
        // The y-position is negative to draw upwards from the x-axis
        rect(x - (deltaX/2), -y_height, deltaX, y_height);
    }
    // --- Part 2: Display the text ---
    noStroke();
    fill(0);
    textSize(24);
  
    let area = calculateReimannSum(parabola, a, b, N);
    text("Area: " + area.toFixed(2), 10, 40);
}

// ------------------------------------------------------
// Helper function to calculate the Reimann sum
/**
 * Calculates the Riemann sum for the function y = x^2.
 * @param {function} func The function to integrate. e.g., (x) => x * x
 * @param {number} a The starting x-value.
 * @param {number} b The ending x-value.
 * @param {number} N The number of rectangles.
 * @returns {number} The approximate area under the curve.
 */
function calculateReimannSum(func, a, b, n) {
    let deltaX = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        let x = a + i * deltaX;
        sum += func(x) * deltaX;
    }
    return sum;
}

// Helper function for the parabola sketch
function parabola(x) {
    return x * x;
}