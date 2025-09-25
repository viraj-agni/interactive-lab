// --- LabObject Class Definition ---
class LabObject {
  /**
   * @param {string} id - A unique identifier for the object.
   * @param {string} name - The name of the object.
   * @param {p5.Vector} position - The object's position vector.
   */
  constructor(id, name, position) {
    this.id = id;
    this.name = name;
    this.position = position;
  }

  // A placeholder method for drawing the object on the canvas.
  draw() {
    push();
    translate(this.position.x, this.position.y);
    fill(255, 100, 100);
    noStroke();
    ellipse(0, 0, 25, 25);
    fill(0);
    textAlign(CENTER, BOTTOM);
    text(this.name, 0, -15);
    pop();
  }
}

// --- NEW: ParabolaObject Class Definition ---
class ParabolaObject extends LabObject {
  /**
   * @param {string} id - A unique identifier for the object.
   * @param {string} name - The name of the object.
   * @param {p5.Vector} position - The object's position vector.
   * @param {number} scale - Controls the "width" of the parabola.
   * @param {number} range - How far to draw the parabola from its origin.
   */
  constructor(id, name, position, scale = 200, range = 400) {
    super(id, name, position); // Call the parent class constructor
    this.scale = scale;
    this.range = range;
  }

  // Override the parent's draw method
  draw() {
    push(); // Isolate drawing styles

    // Move to the parabola's own position
    translate(this.position.x, this.position.y);

    // Style the parabola line
    noFill();
    stroke(0, 123, 255); // A nice blue color
    strokeWeight(2);

    // Draw the parabola shape
    beginShape();
    for (let x = -this.range / 2; x < this.range / 2; x += 1) {
      // Equation: y = (1/scale) * x^2
      let y = (x * x) / this.scale;
      vertex(x, -y); // Use -y to draw upwards in a standard Cartesian way
    }
    endShape();

    pop(); // Restore original drawing styles
  }
}


// --- Global Variables ---
let sceneObjects = []; // An array to hold all objects in our scene

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');

  // --- Create an instance of our new ParabolaObject ---
  const parabolaPosition = createVector(0, 100); // Start it a bit lower
  sceneObjects.push(new ParabolaObject('parabola-01', 'Function f(x) = x^2', parabolaPosition));
}

function draw() {
  background(255); // Set a white background
  
  // Move the origin (0,0) to the center of the screen
  translate(width / 2, height / 2);

  // --- Draw the Cartesian Grid ---
  let gridSize = 50;
  stroke(220);
  strokeWeight(1);
  for (let x = 0; x < width / 2; x += gridSize) {
    line(x, -height / 2, x, height / 2);
    line(-x, -height / 2, -x, height / 2);
  }
  for (let y = 0; y < height / 2; y += gridSize) {
    line(-width / 2, y, width / 2, y);
    line(-width / 2, -y, width / 2, -y);
  }

  // --- Draw the main axes ---
  stroke(0);
  strokeWeight(2);
  line(-width / 2, 0, width / 2, 0); // X-axis
  line(0, -height / 2, 0, height / 2); // Y-axis

  // --- Draw all objects in the sceneObjects array ---
  // This will now call ParabolaObject's draw() method automatically
  for (let i = 0; i < sceneObjects.length; i++) {
    sceneObjects[i].draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

