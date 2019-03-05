const gameW = 400;
const gameH = 400;
const tileW = 20;
const tileH = 20;
const gridW = gameW / tileW;
const gridH = gameH / tileH;
let delay;
let isPlay;
let timer;

const defaults = [[9, 9], [10, 9], [11, 9], [11, 10], [10, 11]];

window.addEventListener("load", function() {
  console.log("All assets are loaded");
  let game = document.getElementById("game");

  var slider = document.getElementById("range");
  var output = document.getElementById("rangeVal");
  output.innerHTML = `Play Update Delay: ${slider.value}ms`; // Display the default slider value
  delay = slider.value;
  isPlay = false;

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    output.innerHTML = `Play Update Delay: ${this.value}ms`;
    delay = this.value;

    if (isPlay) {
      clearInterval(timer);
      timer = setInterval(function() {
        step();
      }, delay);
    }
  };
  console.log(defaults.length);
  for (let i = 0; i < gridW; ++i) {
    for (let j = 0; j < gridH; ++j) {
      let node = document.createElement("div");
      node.className += `node w-${i} h-${j}`;
      node.setAttribute("onmousedown", "nodeClick(this)");

      for (let k = 0; k < defaults.length; ++k) {
        if (i == defaults[k][0] && j == defaults[k][1]) {
          nodeClick(node);
        }
      }

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

function playOn() {
  isPlay = true;
  timer = setInterval(function() {
    step();
  }, delay);

  let button = document.getElementById("play");
  button.setAttribute("id", "stop");
  button.setAttribute("onclick", "playOff()");
  button.innerHTML = "Pause";
}

function playOff() {
  isPlay = false;
  clearInterval(timer);

  let button = document.getElementById("stop");
  button.setAttribute("id", "play");
  button.setAttribute("onclick", "playOn()");
  button.innerHTML = "Play";
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

function reset() {
  console.log("clear");
  for (let i = 0; i < gridW; ++i) {
    for (let j = 0; j < gridH; ++j) {
      let node = document.getElementsByClassName(`node w-${i} h-${j}`);

      if (node[0].classList.contains("on")) {
        nodeClick(node[0]);
      }
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
