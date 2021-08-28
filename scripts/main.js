const container = document.querySelector("#container");
const gridSize = document.querySelector("#grid-size");
const clear = document.querySelector("#clear");
const greyScaleBtn = document.querySelector("#greyscale");
const rainbowBtn = document.querySelector("#rainbow");
const colorPicker = document.querySelector("#color");
const colorSwitcher = document.querySelector("#color-switcher");
const eraser = document.querySelector("#eraser");

let hoverColor = "#000";
let rainbow = false;
let greyscale = false;

clear.addEventListener("click", () => {
  clearGrid();
  hoverColor = "#000";
  toggleGreyRainbow(false, false);
});

colorPicker.addEventListener("input", (e) => {
  hoverColor = e.target.value;
});

colorSwitcher.addEventListener("click", () => {
  hoverColor = colorPicker.value;
  toggleGreyRainbow(false, false);
});

eraser.addEventListener("click", () => {
  hoverColor = "#fff";
  toggleGreyRainbow(false, false);
});

greyScaleBtn.addEventListener("click", () => {
  toggleGreyRainbow(true, false);
});

rainbowBtn.addEventListener("click", () => {
  toggleGreyRainbow(false, true);
});

/* While dragging the range slider */
gridSize.addEventListener("input", (e) => {
  gridSize.labels[0].innerHTML = `${e.target.value} &times; ${e.target.value}`;
});

gridSize.addEventListener("change", (e) => {
  setGridSize(e.target.value);
});

function changeColorOnHover(e) {
  if (greyscale) {
    let r = 255;
    let g = 255;
    let b = 255;
    if (e.target.style.background) {
      let rgb = e.target.style.background.split(",");
      r = +rgb[0].match(/\d+/g)[0];
      g = +rgb[1].match(/\d+/g)[0];
      b = +rgb[2].match(/\d+/g)[0];
    }
    let [newR, newG, newB] = turnGreyScale(r, g, b);
    e.target.style.background = `rgb(${newR}, ${newG}, ${newB})`;
  } else if (rainbow) {
    let [r, g, b] = randomRGB();
    e.target.style.background = `rgb(${r}, ${g}, ${b})`;
  } else {
    e.target.style.background = hoverColor;
  }
}

function clearGrid() {
  const gridSquares = [...document.querySelectorAll(".square")];
  gridSquares.forEach((sqr) => {
    sqr.style.background = "#fff";
  });
}

function setGridSize(size) {
  container.textContent = "";
  for (let i = 0; i < size ** 2; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");
    squareDiv.style.cssText = `display: flex; background-color: #fff; transition: background-color 150ms ease-in; width: ${
      100 / size
    }%; height: ${100 / size}%;`;
    squareDiv.addEventListener("mouseover", changeColorOnHover);
    container.appendChild(squareDiv);
  }
}

function turnGreyScale(r, g, b) {
  let newR = r - 25 >= 0 ? r - 25 : 0;
  let newG = g - 25 >= 0 ? g - 25 : 0;
  let newB = b - 25 >= 0 ? b - 25 : 0;
  return [newR, newG, newB];
}

function randomRGB() {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ];
}

function toggleGreyRainbow(grey, rain) {
  greyscale = grey;
  rainbow = rain;
}

/* Initialization */
setGridSize(16);
