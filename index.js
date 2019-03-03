const gameW = 400;
const gameH = 400;
const tileW = 20;
const tileH = 20;
const gridW = gameW / tileW;
const gridH = gameH / tileH;
window.addEventListener("load", function() {
  console.log("All assets are loaded");
  let game = document.getElementById("game");

  for (let i = 0; i < gridW; ++i) {
    for (let j = 0; j < gridH; ++j) {
      let node = document.createElement("div");
      node.className += `node w-${i} h-${j}`;
      node.setAttribute("onmousedown", "nodeClick(this)");

      game.appendChild(node);
    }
  }
});

function nodeClick(node) {
  if (node.classList.contains("on")) {
    node.classList.remove("on");
    node.className += " off";
    //console.log("off");
  } else {
    node.classList.remove("off");
    node.className += " on";
    //console.log("on");
  }
}

function step() {
  let index = 0;
  let count = [];
  for (let i = 0; i < gridW; ++i) {
    for (let j = 0; j < gridH; ++j) {
      let node = document.getElementsByClassName(`node w-${i} h-${j}`);
      count[index] = countNeighbours(node[0], i, j);
      index++;
    }
  }
  index = 0;
  for (let i = 0; i < gridW; ++i) {
    for (let j = 0; j < gridH; ++j) {
      let node = document.getElementsByClassName(`node w-${i} h-${j}`);
      let c = count[index];
      console.log(c);
      if (node[0].classList.contains("on")) {
        if (c <= 1 || c >= 4) {
          nodeClick(node[0]);
        }
      } else {
        if (c == 3) {
          nodeClick(node[0]);
        }
      }
      index++;
    }
  }
}

function flip() {
  for (let i = 0; i < gridW; ++i) {
    for (let j = 0; j < gridH; ++j) {
      let node = document.getElementsByClassName(`node w-${i} h-${j}`);
      //console.log(node[0]);
      nodeClick(node[0]);
    }
  }
}

function countNeighbours(node, w, h) {
  let count = 0;
  for (let i = w - 1; i < w + 2; ++i) {
    for (let j = h - 1; j < h + 2; ++j) {
      let neighbour = document.getElementsByClassName(`node w-${i} h-${j}`);
      if (i != w || j != h) {
        if (typeof neighbour[0] !== "undefined") {
          if (neighbour[0].classList.contains("on")) {
            count++;
          }
        }
      }
    }
  }

  return count;
}
