// Create and insert the canvas element behind the content
(function createBackgroundCanvas() {
  const canvas = document.createElement("canvas");
  canvas.id = "bgCanvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none"; // so it doesn't block clicks
  document.body.prepend(canvas);
})();

function randomDarkBlue() {
  const blues = [
    "#0a192f", "#112240", "#1e3a5f", "#243b53",
    "#102a43", "#0d1b2a", "#1b263b", "#274060"
  ];
  return blues[Math.floor(Math.random() * blues.length)];
}

function drawShapes() {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Set canvas size to window size (in device pixels)
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const shapeCount = 30;

  for (let i = 0; i < shapeCount; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 120 + 40; // 40–160 px
    const color = randomDarkBlue();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.6;

    const shapeType = Math.floor(Math.random() * 3);

    if (shapeType === 0) {
      // Circle
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
      ctx.fill();

    } else if (shapeType === 1) {
      // Bean shape: two overlapping circles
      const offset = size * 0.3;
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
      ctx.arc(x + offset, y, size / 2, 0, 2 * Math.PI);
      ctx.fill();

    } else {
      // Pill shape: rounded rectangle
      const width = size * 1.5;
      const height = size * 0.6;
      const radius = height / 2;

      ctx.beginPath();
      ctx.moveTo(x - width / 2 + radius, y - height / 2);
      ctx.lineTo(x + width / 2 - radius, y - height / 2);
      ctx.quadraticCurveTo(x + width / 2, y - height / 2, x + width / 2, y - height / 2 + radius);
      ctx.lineTo(x + width / 2, y + height / 2 - radius);
      ctx.quadraticCurveTo(x + width / 2, y + height / 2, x + width / 2 - radius, y + height / 2);
      ctx.lineTo(x - width / 2 + radius, y + height / 2);
      ctx.quadraticCurveTo(x - width / 2, y + height / 2, x - width / 2, y + height / 2 - radius);
      ctx.lineTo(x - width / 2, y - height / 2 + radius);
      ctx.quadraticCurveTo(x - width / 2, y - height / 2, x - width / 2 + radius, y - height / 2);
      ctx.closePath();
      ctx.fill();
    }
  }
}

// Draw shapes on load and resize
window.addEventListener("load", drawShapes);
window.addEventListener("resize", drawShapes);
