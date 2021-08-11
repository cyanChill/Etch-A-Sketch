const container = document.querySelector("#container");
const gridSize = document.querySelector("#grid-size");
const clear = document.querySelector("#clear");
const greyScaleBtn = document.querySelector("#greyscale");
const colorPicker = document.querySelector("#color");
const colorSwitcher = document.querySelector("#color-switcher");
const eraser = document.querySelector("#eraser");

let hoverColor = "#000";
let greyscale = false;

clear.addEventListener("click", clearGrid);

colorPicker.addEventListener("input", (e) => {
  hoverColor = e.target.value;
});

colorSwitcher.addEventListener("click", () => {
  hoverColor = colorPicker.value;
  greyscale = false;
});

eraser.addEventListener("click", () => {
  hoverColor = "#fff";
  greyscale = false;
});

greyScaleBtn.addEventListener("click", () => {
  greyscale = true;
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
  container.innerHTML = "";
  for (let i = 0; i < size ** 2; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");
    squareDiv.style.cssText = `display: flex; width: ${100 / size}%; height: ${
      100 / size
    }%;`;
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

/* Initialization */
setGridSize(16);
