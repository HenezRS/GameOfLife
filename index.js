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
    console.log("off");
  } else {
    node.classList.remove("off");
    node.className += " on";
    console.log("on");
  }
}

function step() {
  for (let i = 0; i < gridW; ++i) {
    for (let j = 0; j < gridH; ++j) {
      let node = document.getElementsByClassName(`node w-${i} h-${j}`);
      //console.log(node[0]);
      nodeClick(node[0]);
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
