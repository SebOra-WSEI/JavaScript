let POSITION = 1;

const images = document.querySelectorAll("#sliderImage");
const dots = document.querySelectorAll("#dot");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const pauseBtn = document.querySelector("#pauseBtn");
const playBtn = document.querySelector("#playBtn");
const realoadBtn = document.querySelector("#realoadBtn");

mainLogic(POSITION);

const dynamicSlider = setInterval(() => {
  POSITION++;
  mainLogic(POSITION);
}, 2000);

prev.addEventListener("click", () => {
  POSITION -= 1;
  mainLogic(POSITION);
});

next.addEventListener("click", () => {
  POSITION += 1;
  mainLogic(POSITION);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(dynamicSlider);
  pauseBtn.disabled = true;
  playBtn.disabled = false;
});

playBtn.addEventListener("click", () => {
  setInterval(() => {
    POSITION++;
    mainLogic(POSITION);
  }, 2000);

  playBtn.disabled = true;
});

realoadBtn.addEventListener("click", () => window.location.reload());

function mainLogic(n) {
  addText();

  if (n > images.length) {
    POSITION = 1;
  }

  if (n < 1) {
    POSITION = images.length;
  }

  images.forEach((image) => {
    image.style.display = "none";
  });

  dots.forEach((dot) => {
    dot.className = dot.className.replace("active", "");
  });

  images[POSITION - 1].style.display = "block";
  dots[POSITION - 1].className += " active";
}

function addText() {
  images.forEach((image, index) => {
    const position = index + 1;

    const div = document.createElement("div");
    div.className = "numberText";
    div.textContent = `${position} / ${images.length}`;

    image.prepend(div);
  });
}

const displayImageByDot = (n) => {
  POSITION = n;
  mainLogic(POSITION);
};
