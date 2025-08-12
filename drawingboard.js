const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');

let drawing = false;
let currentColor = '#000000';

const colorPicker = document.getElementById('color-picker');
const clearBtn = document.getElementById('clear-btn');

colorPicker.addEventListener('change', (e) => {
  currentColor = e.target.value;
});

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
