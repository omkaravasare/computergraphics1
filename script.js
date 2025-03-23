const canvas = document.getElementById("metroCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let metroX = -600;
const metroSpeed = 2;
let wheelRotation = 0;
let trafficX2 = canvas.width; // Traffic moving right to left
let airplaneX = 200; // Starting further right on screen
let airplaneY = 100; // Higher in the sky

// Car image objects for the two cars moving to the left
const carImages = {
    car3: new Image(),
    car4: new Image(),
    airplane: new Image()
};

// Set the source for each car image
carImages.car3.src = 'images/fortuner.png'; // Replace with actual image paths
carImages.car4.src = 'images/bmw.png';
carImages.airplane.src = 'images/airplane.png';

// Add a loading check for images
let imagesLoaded = 0;
const totalImages = Object.keys(carImages).length;

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        // Start animation once all images are loaded
        animate();
    }
}

// Add load event listeners to each image
Object.values(carImages).forEach(img => {
    img.onload = imageLoaded;
    // Add error handling in case images don't load
    img.onerror = () => {
        console.error("Error loading image");
        imagesLoaded++;
        if(imagesLoaded === totalImages) {
            animate();
        }
    };
});

// Force transparency for the airplane
carImages.airplane.setAttribute('crossOrigin', 'Anonymous');

function drawBackground() {
    // Draw Sun
    ctx.fillStyle = "#FFD700"; // Gold color for the sun
    ctx.beginPath();
    ctx.arc(canvas.width - 100, 100, 50, 0, Math.PI * 2);
    ctx.fill();
}

function drawBridge() {
    // Bridge Base
    ctx.fillStyle = "#A0522D"; // Brown color for the bridge
    ctx.fillRect(0, canvas.height - 220, canvas.width, 20);

    // Tracks
    ctx.fillStyle = "#222";
    for (let i = 0; i < canvas.width; i += 60) {
        ctx.fillRect(i, canvas.height - 200, 40, 10);
    }

    // Bridge Pillars
    ctx.fillStyle = "#8B4513"; // Dark brown for pillars
    for (let i = 50; i < canvas.width; i += 200) {
        ctx.fillRect(i, canvas.height - 200, 30, 100);
    }
}

function drawRoad() {
    // Road
    ctx.fillStyle = "#808080"; // Gray color for the road
    ctx.fillRect(0, canvas.height - 100, canvas.width, 80);

    // Road Divider
    ctx.fillStyle = "#FFFF00"; // Yellow color for the divider
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.fillRect(i, canvas.height - 60, 20, 5);
    }
}

function drawTraffic() {
    // Check if images are loaded
    const imagesAreLoaded = imagesLoaded === totalImages;
    
    if (imagesAreLoaded) {
        // Draw car images when loaded - only the two cars moving to the left
        // Position them properly on the road with increased size
        
        // First car moving right to left (top lane of the road)
        ctx.save();
        ctx.scale(-1, 1); // Flip horizontally
        // Increased size: width from 80 to 120, height from 35 to 55
        ctx.drawImage(carImages.car3, -trafficX2 - 150, canvas.height - 160, 180, 100);
        ctx.restore();
        
        // Second car moving right to left (top lane of the road, further behind)
        ctx.save();
        ctx.scale(-1, 1); // Flip horizontally
        // Increased size: width from 80 to 120, height from 35 to 55
        ctx.drawImage(carImages.car4, -(trafficX2 - 300) - 150, canvas.height - 160, 170, 150);
        ctx.restore();
    } else {
        // Fallback to original geometric cars if images not loaded
        // Green car - Increased size
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(trafficX2, canvas.height - 95, 90, 35); // Increased from 60x25 to 90x35
        // Car roof
        ctx.fillStyle = "#00CC00";
        ctx.fillRect(trafficX2 + 15, canvas.height - 115, 60, 20); // Increased from 40x15 to 60x20
        // Windows
        ctx.fillStyle = "#99CCFF";
        ctx.fillRect(trafficX2 + 20, canvas.height - 110, 50, 15); // Increased from 30x10 to 50x15
        // Wheels
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(trafficX2 + 25, canvas.height - 60, 12, 0, Math.PI * 2); // Increased radius from 8 to 12
        ctx.arc(trafficX2 + 65, canvas.height - 60, 12, 0, Math.PI * 2); // Increased radius from 8 to 12
        ctx.fill();

        // Orange car - Increased size
        ctx.fillStyle = "#FFA500";
        ctx.fillRect(trafficX2 - 300, canvas.height - 95, 90, 35); // Increased from 60x25 to 90x35
        // Car roof
        ctx.fillStyle = "#FF8C00";
        ctx.fillRect(trafficX2 - 285, canvas.height - 115, 60, 20); // Increased from 40x15 to 60x20
        // Windows
        ctx.fillStyle = "#99CCFF";
        ctx.fillRect(trafficX2 - 280, canvas.height - 110, 50, 15); // Increased from 30x10 to 50x15
        // Wheels
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(trafficX2 - 275, canvas.height - 60, 12, 0, Math.PI * 2); // Increased radius from 8 to 12
        ctx.arc(trafficX2 - 235, canvas.height - 60, 12, 0, Math.PI * 2); // Increased radius from 8 to 12
        ctx.fill();
    }

    // Update traffic position
    trafficX2 -= 3;

    // Reset traffic position when cars go off-screen
    // Increased the threshold to account for larger car size
    if (trafficX2 < -350) trafficX2 = canvas.width;
}

function drawTrees() {
    // Trees at the left side of the road
    drawTree(50, canvas.height - 80);
    drawTree(150, canvas.height - 80);
}

function drawTree(x, y) {
    // Tree trunk
    ctx.fillStyle = "#8B4513"; // Brown color for the trunk
    ctx.fillRect(x, y, 20, 60);

    // Tree leaves
    ctx.fillStyle = "#228B22"; // Green color for the leaves
    ctx.beginPath();
    ctx.arc(x + 10, y - 20, 40, 0, Math.PI * 2);
    ctx.fill();
}

function drawVegetation() {
    // Draw grass only at the bottom (below the road)
    ctx.fillStyle = "#32CD32"; // Light green for grass
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
    
    // Draw just a few bushes at the left side (removed right side bushes)
    ctx.beginPath();
    ctx.arc(50, canvas.height - 20, 15, 0, Math.PI * 2);
    ctx.arc(150, canvas.height - 20, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawMetro() {
    ctx.fillStyle = "#000"; // Metro Body
    ctx.fillRect(metroX, canvas.height - 260, 600, 50);

    ctx.fillStyle = "#800080"; // Purple Line Below Windows
    ctx.fillRect(metroX, canvas.height - 220, 600, 5);

    // Separation between coaches
    ctx.fillStyle = "#222";
    for (let i = 200; i < 600; i += 200) {
        ctx.fillRect(metroX + i, canvas.height - 260, 5, 50);
    }

    // Windows with glare effect
    ctx.fillStyle = "#fff";
    // Using a fixed number of windows instead of calculating based on coach length
    const windowPositions = [30, 130, 230, 330, 430, 530];
    
    windowPositions.forEach(position => {
        // Draw basic window
        ctx.fillRect(metroX + position, canvas.height - 250, 50, 20);
        
        // Add window glare
        const gradient = ctx.createLinearGradient(metroX + position, canvas.height - 250, metroX + position + 50, canvas.height - 230);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)");
        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.7)");
        gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.3)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(metroX + position + 5, canvas.height - 248, 40, 5);
        
        // Reset fill style for next window
        ctx.fillStyle = "#fff";
    });

    // Rounded front design
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(metroX + 600, canvas.height - 260);
    ctx.quadraticCurveTo(metroX + 630, canvas.height - 235, metroX + 600, canvas.height - 210);
    ctx.fill();

    // Wheels
    ctx.fillStyle = "#444";
    for (let i = 30; i < 600; i += 100) {
        drawWheel(metroX + i);
    }
}

function drawWheel(x) {
    ctx.beginPath();
    ctx.arc(x, canvas.height - 210, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.moveTo(x, canvas.height - 210);
    ctx.lineTo(x + Math.cos(wheelRotation) * 10, canvas.height - 210 + Math.sin(wheelRotation) * 10);
    ctx.stroke();
}

function drawAirplane() {
    // Check if airplane image is loaded
    if (carImages.airplane.complete && carImages.airplane.naturalHeight !== 0) {
        // Draw airplane using the loaded image - increased size (was 150x80)
        ctx.drawImage(carImages.airplane, airplaneX, airplaneY, 350,220);
    } else {
        // Only draw fallback if image isn't loaded
        ctx.fillStyle = "#FFFFFF";
        
        // Airplane body
        ctx.beginPath();
        ctx.moveTo(airplaneX, airplaneY + 20);
        ctx.lineTo(airplaneX + 120, airplaneY + 20);
        ctx.lineTo(airplaneX + 140, airplaneY + 30);
        ctx.lineTo(airplaneX, airplaneY + 30);
        ctx.closePath();
        ctx.fill();
        
        // Wings
        ctx.beginPath();
        ctx.moveTo(airplaneX + 30, airplaneY + 25);
        ctx.lineTo(airplaneX + 70, airplaneY);
        ctx.lineTo(airplaneX + 80, airplaneY);
        ctx.lineTo(airplaneX + 50, airplaneY + 25);
        ctx.closePath();
        ctx.fill();
        
        // Tail
        ctx.beginPath();
        ctx.moveTo(airplaneX + 90, airplaneY + 20);
        ctx.lineTo(airplaneX + 100, airplaneY - 10);
        ctx.lineTo(airplaneX + 110, airplaneY - 10);
        ctx.lineTo(airplaneX + 100, airplaneY + 20);
        ctx.closePath();
        ctx.fill();
    }
    
    // Update airplane position - reduced tilt by changing Y descent rate
    airplaneX += 2;
    airplaneY -= 0.2; // Reduced from 0.5 to 0.2 for less tilt
    
    // Let it go to the end of screen before resetting
    if (airplaneX > canvas.width + 220) { // Changed to match the airplane's width
        airplaneX = -220;
        airplaneY = 150;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawRoad();
    drawBridge();
    drawTraffic();
    drawVegetation();
    drawTrees();
    drawMetro();
    drawAirplane();

    metroX += metroSpeed;
    wheelRotation += 0.2;

    if (metroX > canvas.width) metroX = -600;

    requestAnimationFrame(animate);
}

// Start animating immediately if no images to load
if (totalImages === 0) {
    animate();
}
// Otherwise, animate() will be called after all images are loaded