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

// Helper function to get the correct coordinates for mouse/touch
function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    let x, y;

    if (e.touches) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.offsetX;
        y = e.offsetY;
    }

    return { x, y };
}

// Handle drawing for mouse events
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const { x, y } = getCanvasCoordinates(e);
    [lastX, lastY] = [x, y];
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const { x, y } = getCanvasCoordinates(e);
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.stroke();
        [lastX, lastY] = [x, y];
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Handle touch events for mobile
canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    const { x, y } = getCanvasCoordinates(e);
    [lastX, lastY] = [x, y];
    e.preventDefault(); // Prevent scrolling
});

canvas.addEventListener('touchmove', (e) => {
    if (isDrawing) {
        const { x, y } = getCanvasCoordinates(e);
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.stroke();
        [lastX, lastY] = [x, y];
    }
    e.preventDefault(); // Prevent scrolling
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
