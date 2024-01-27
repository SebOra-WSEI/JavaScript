const SPEED = 2.5;

const fpscounter = document.querySelector("#fps");
fpscounter.innerHTML = "Checking fps..."
const canvas = document.querySelector('#myCanvas');
const ballCountInput = document.querySelector('#ballCount');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');

startBtn.addEventListener('click', startAnimation);
resetBtn.addEventListener('click', resetAnimation)

const ctx = canvas.getContext('2d');
let connectionDistance = 100;
let lineWidth = 2;
let balls = [];
let animationId = '';

const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;

const createBall = () => {
  return {
    x: getRandomInt(canvas.width - 20),
    y: getRandomInt(canvas.height - 20),
    radius: 10,
    dx: SPEED * (Math.random() < 0.5 ? 1 : -1),
    dy: SPEED * (Math.random() < 0.5 ? 1 : -1),
  };
}

const drawBall = (ball) => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}

const drawLine = (ball1, ball2) => {
  ctx.beginPath();
  ctx.moveTo(ball1.x, ball1.y);
  ctx.lineTo(ball2.x, ball2.y);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();
}

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.map((ball) => {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
      ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.dy = -ball.dy;
    }

    drawBall(ball);

    balls.map(b1 => {
      const distance = Math.sqrt((ball.x - b1.x) ** 2 + (ball.y - b1.y) ** 2);

      if (distance < connectionDistance * 2) {
        drawLine(ball, b1);
      };
    });
  });

  animationId = requestAnimationFrame(update);
}

function startAnimation() {
  balls = [];

  for (let i = 0; i < parseInt(ballCountInput.value); i++) {
    balls.push(createBall());
  }

  cancelAnimationFrame(animationId);
  update();
}

function resetAnimation() {
  balls = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cancelAnimationFrame(animationId);
}

let frameCount = 0;

(function updateFrame() {
  frameCount++;
  requestAnimationFrame(updateFrame);
})()

setInterval(() => {
  fpscounter.innerHTML = frameCount + " fps";
  frameCount = 0;
}, 500);