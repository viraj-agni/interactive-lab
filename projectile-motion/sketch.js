// --- Global Variables ---
let cannonball;
const gravity = new p5.Vector(0, 0.2);
let isLaunched = false;
let trajectory = [];

// --- p5.js Setup Function ---
function setup() {
    // A more robust fix for the race condition.
    setTimeout(() => {
        // Find the canvas container div
        let canvasContainer = document.getElementById('canvas-container');

        // Create a placeholder canvas and parent it to the container.
        // Its size doesn't matter as it will be immediately resized.
        let canvas = createCanvas(100, 100);
        canvas.parent('canvas-container');

        // Now, trigger the windowResized function to correctly size the canvas
        // after the browser has finished its initial layout rendering.
        windowResized();

        // Initialize the cannonball
        resetSimulation();

        // --- Event Listeners for Controls ---
        const launchButton = document.querySelector('.btn-primary');
        const resetButton = document.querySelector('.btn-secondary');
        const angleSlider = document.getElementById('angle-slider');
        const speedSlider = document.getElementById('speed-slider');
        const angleLabel = document.querySelector('label[for="angle-slider"]');
        const speedLabel = document.querySelector('label[for="speed-slider"]');

        launchButton.addEventListener('click', launch);
        resetButton.addEventListener('click', resetSimulation);

        angleSlider.addEventListener('input', () => {
            angleLabel.textContent = `Launch Angle: ${angleSlider.value}°`;
        });

        speedSlider.addEventListener('input', () => {
            speedLabel.textContent = `Initial Speed: ${speedSlider.value} m/s`;
        });
    }, 0); // A 0ms timeout defers execution until the browser is ready.
}

// --- p5.js Draw Loop ---
function draw() {
    // ---- ADD THIS GUARD CLAUSE ----
    if (!cannonball) return;
    // -----------------------------
    
    // Guard against drawing before the canvas is created
    if (!window.canvas) return;

    background(240, 242, 245); // Light grey background

    // If the simulation is running, update physics
    if (isLaunched) {
        cannonball.velocity.add(gravity);
        cannonball.position.add(cannonball.velocity);
        // Add current position to the trajectory array
        trajectory.push(cannonball.position.copy());
    }

    // --- Visualization ---

    // Draw the cannonball
    fill(50);
    noStroke();
    ellipse(cannonball.position.x, cannonball.position.y, 20, 20);

    // Draw the trajectory tracer
    noFill();
    stroke(0, 123, 255, 150); // Blue with transparency
    strokeWeight(4);
    beginShape();
    for (let pos of trajectory) {
        vertex(pos.x, pos.y);
    }
    endShape();

    // Reset if the ball goes off-screen
    if (cannonball.position.y > height || cannonball.position.x > width) {
        isLaunched = false;
    }
}

// --- Simulation Functions ---

/**
 * Launches the cannonball with the current angle and speed settings.
 */
function launch() {
    if (isLaunched) return; // Prevent re-launching mid-flight

    const angle = document.getElementById('angle-slider').value;
    const speed = document.getElementById('speed-slider').value / 5; // Scale speed for better visualization

    // Convert angle to radians and create the initial velocity vector
    const launchAngle = radians(angle);
    const launchVelocity = p5.Vector.fromAngle(-launchAngle); // Negative angle because p5's y-axis is inverted
    launchVelocity.mult(speed);

    cannonball.velocity = launchVelocity;
    isLaunched = true;
}

/**
 * Resets the cannonball to its initial state and clears the trajectory.
 */
function resetSimulation() {
    isLaunched = false;
    cannonball = {
        position: new p5.Vector(20, height - 20),
        velocity: new p5.Vector(0, 0)
    };
    trajectory = []; // Clear the trajectory path
    redraw(); // Redraw the canvas to show the reset state
}

// --- p5.js Helper Function ---

function windowResized() {
    // Find the canvas container div again
    let canvasContainer = document.getElementById('canvas-container');
    // If the container doesn't exist yet, do nothing.
    if (!canvasContainer) return;

    // Get its new width and height
    let canvasWidth = canvasContainer.offsetWidth;
    let canvasHeight = canvasContainer.offsetHeight;

    // Resize the canvas to match the container
    resizeCanvas(canvasWidth, canvasHeight);
    resetSimulation(); // Reset the simulation on resize
}