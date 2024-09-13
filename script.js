const canvas = document.getElementById('signatureCanvas');
const bgColorInput = document.getElementById('bgColor');
const penColorInput = document.getElementById('penColor');
const penWidthInput = document.getElementById('penWidth');
const clearButton = document.getElementById('clearButton');
const downloadButton = document.getElementById('downloadButton');
const lastSavedButton = document.getElementById('lastSavedButton');

const context = canvas.getContext('2d');
let isDrawing = false;

let lastSavedKey = localStorage.getItem('lastSavedKey');

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

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

clearButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

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
