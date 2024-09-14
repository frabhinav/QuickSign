const canvas = document.getElementById('signatureCanvas');
const bgColorInput = document.getElementById('bgColor');
const penColorInput = document.getElementById('penColor');
const penWidthInput = document.getElementById('penWidth');
const clearButton = document.getElementById('clearButton');
const downloadButton = document.getElementById('downloadButton');
const lastSavedButton = document.getElementById('lastSavedButton');

const context = canvas.getContext('2d');
let isDrawing = false;
let lastX, lastY;

let lastSavedKey = localStorage.getItem('lastSavedKey');

// Handle input changes
bgColorInput.addEventListener('input', (e) => {
    canvas.style.backgroundColor = e.target.value;
});

penColorInput.addEventListener('input', (e) => {
    context.strokeStyle = e.target.value;
    context.fillStyle = e.target.value;
});

penWidthInput.addEventListener('input', () => {
    context.lineWidth = penWidthInput.value;
});

// Function to get position relative to canvas (works for both mouse and touch)
function getPosition(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        return {
            x: (touch.clientX - rect.left) * (canvas.width / rect.width),
            y: (touch.clientY - rect.top) * (canvas.height / rect.height)
        };
    } else {
        return {
            x: (e.clientX - rect.left) * (canvas.width / rect.width),
            y: (e.clientY - rect.top) * (canvas.height / rect.height)
        };
    }
}

// Handle drawing for mouse events
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const pos = getPosition(e);
    [lastX, lastY] = [pos.x, pos.y];
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const pos = getPosition(e);
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(pos.x, pos.y);
        context.stroke();
        [lastX, lastY] = [pos.x, pos.y];
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Handle touch events for mobile
canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    const pos = getPosition(e);
    [lastX, lastY] = [pos.x, pos.y];
    e.preventDefault();  // Prevent scroll on touch
});

canvas.addEventListener('touchmove', (e) => {
    if (isDrawing) {
        const pos = getPosition(e);
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(pos.x, pos.y);
        context.stroke();
        [lastX, lastY] = [pos.x, pos.y];
    }
    e.preventDefault();  // Prevent scrolling on touch move
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});

// Clear the canvas
clearButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

// Save and download the signature
downloadButton.addEventListener('click', () => {
    const image = canvas.toDataURL('image/png');
    
    const currentTime = Date.now();
    const uniqueKey = `signature_${currentTime}`;
    
    localStorage.setItem(uniqueKey, image);
    localStorage.setItem('lastSavedKey', uniqueKey);
    
    const link = document.createElement('a');
    link.href = image;
    link.download = `Signature_${currentTime}.png`;
    link.click();
});

// Load the last saved signature
lastSavedButton.addEventListener('click', () => {
    lastSavedKey = localStorage.getItem('lastSavedKey');
    
    if (lastSavedKey) {
        const savedImage = localStorage.getItem(lastSavedKey);
        if (savedImage) {
            const img = new Image();
            img.src = savedImage;
            img.onload = () => context.drawImage(img, 0, 0);
        }
    } else {
        alert('No saved signature found.');
    }
});
