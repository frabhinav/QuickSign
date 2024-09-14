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

// Function to get touch position relative to the canvas
function getTouchPosition(touch) {
    const rect = canvas.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    const x = touch.clientX - rect.left + scrollLeft;
    const y = touch.clientY - rect.top + scrollTop;
    console.log(`Touch position: x=${x}, y=${y}`);
    return {
        x: x,
        y: y
    };
}
// Handle drawing for mouse events
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Handle touch events for mobile
canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    const touch = e.touches[0];
    const { x, y } = getTouchPosition(touch);
    [lastX, lastY] = [x, y];
});

canvas.addEventListener('touchmove', (e) => {
    if (isDrawing) {
        const touch = e.touches[0];
        const { x, y } = getTouchPosition(touch);

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
