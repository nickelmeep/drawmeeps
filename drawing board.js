document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('drawing-board');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let painting = false;
  let tool = 'brush';
  let brushColor = document.getElementById('color-picker').value;
  let brushSize = document.getElementById('brush-size').value;

  function startPosition(e) {
    e.preventDefault();
    painting = true;
    draw(e);
  }

  function finishedPosition(e) {
    e.preventDefault();
    painting = false;
    ctx.beginPath();
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  }

  function draw(e) {
    if (!painting) return;
    e.preventDefault();

    const pos = getPos(e);
    const x = pos.x;
    const y = pos.y;

    if (tool === 'brush') {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (tool === 'eraser') {
      ctx.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
    }
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishedPosition);
  canvas.addEventListener('mouseout', finishedPosition);
  canvas.addEventListener('mousemove', draw);

  canvas.addEventListener('touchstart', startPosition);
  canvas.addEventListener('touchend', finishedPosition);
  canvas.addEventListener('touchcancel', finishedPosition);
  canvas.addEventListener('touchmove', draw);

  document.getElementById('color-picker').addEventListener('change', e => {
    brushColor = e.target.value;
  });

  document.getElementById('brush-size').addEventListener('input', e => {
    brushSize = e.target.value;
  });

  document.getElementById('brush-btn').addEventListener('click', () => {
    tool = 'brush';
  });

  document.getElementById('eraser-btn').addEventListener('click', () => {
    tool = 'eraser';
  });

  document.getElementById('clear-btn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  document.getElementById('save-btn').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'my-drawing.png';
    link.click();
  });
});
