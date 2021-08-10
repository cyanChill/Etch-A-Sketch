const container = document.querySelector("#container");
const colorPicker = document.querySelector("#color");
const gridSize = document.querySelector("#grid-size");
const clear = document.querySelector("#clear");

let hoverColor = "black";

colorPicker.addEventListener("change", (e) => {
  hoverColor = e.target.value;
});

clear.addEventListener("click", clearGrid);

/* While dragging the range slider */
gridSize.addEventListener("input", (e) => {
  gridSize.labels[0].innerHTML = `${e.target.value} &times; ${e.target.value}`;
});

gridSize.addEventListener("change", (e) => {
  setGridSize(e.target.value);
});

function changeColorOnHover(e) {
  e.target.style.background = hoverColor;
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

/* Initialization */
setGridSize(16);
