const circleHTML =
    `<svg id="circle-svg" height="120" width="120">
        <circle r="50" cx="60" cy="60" fill="transparent"></circle>
    </svg>`;
const crossHTML = `<div class="cross"></div>`;

let gameboard =
    [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

const winningSequences = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const linePos = [
    'h-t', 'h-c', 'h-b',
    'v-l', 'v-c', 'v-r',
    'd', 'i-d'
];

let winLine;


let currentPlayer = `x`;
let playCount = 0;
let gameActive = true;


function handleClick(index) {
    if (gameboard[index] === '' && gameActive) {
        const current_tile = document.getElementById(`tile-${index}`);
        current_tile.style.cursor = 'not-allowed';
        gameboard[index] = currentPlayer;
        addMark(current_tile);
        playCount += 1;
        if (verifyWin()) {
            document.getElementById(`line-container`).innerHTML = `<div id=${winLine} class-"win-line-wrapper"><div id="l-${winLine}" class="win-line"></div></div>`;
            gameActive = false;
        } else if (playCount === 9) {
            gameActive = false;
        } else {
            if (currentPlayer === 'x') {
                currentPlayer = 'o';
            } else {
                currentPlayer = 'x';
            }
        }
    }
}

function addMark(current_tile) {
    if (currentPlayer === 'x') {
        current_tile.innerHTML = crossHTML;
    } else {
        current_tile.innerHTML = circleHTML;
    }
}

function verifyWin() {
    let found = false;
    winningSequences.forEach((sequence, index) => {
        const [a, b, c] = sequence;
        if (gameboard[a] == 'x' || gameboard[a] == 'o') {
            if (gameboard[a] == gameboard[b] && gameboard[b] == gameboard[c]) {
                found = true;
                winLine = linePos[index];
                return;
            }
        }
    });
    return found;
}

function restartGame() {
    gameActive = true;
    gameboard =
        [
            '', '', '',
            '', '', '',
            '', '', ''
        ];
    currentPlayer = 'x';
    const tiles = document.getElementsByClassName('tile');
    document.getElementById(`line-container`).innerHTML = ``;
    for (let tile of tiles) {
        tile.innerHTML = ``;
        tile.style.cursor = 'pointer';
    }
}

function createBoard() {
    const board = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement('div');
        tile.className = 'tile';
        tile.id = `tile-${i}`;
        tile.addEventListener('click', () => handleClick(i));
        board.appendChild(tile);
    }
}

createBoard();

var theme = "dark";
  const root = document.querySelector(":root");
  const container = document.getElementsByClassName("theme-container")[0];
  container.addEventListener("click", setTheme);
  function setTheme() {
    switch (theme) {
      case "dark":
        setLight();
        theme = "light";
        break;
      case "light":
        setDark();
        theme = "dark";
        break;
    }
  }
  function setLight() {
    root.style.setProperty(
      "--bg-color",
      "#c3d1e4"
      );
      root.style.setProperty(
          "--game-color",
          "#212529"
      );
    container.classList.remove("shadow-dark");
    setTimeout(() => {
      container.classList.add("shadow-light");
    }, 300);
  }
  function setDark() {
      root.style.setProperty("--bg-color", "#212529");
      root.style.setProperty(
          "--game-color",
          "#c3d1e4"
      );
    container.classList.remove("shadow-light");
    setTimeout(() => {
      container.classList.add("shadow-dark");
    }, 300);
  }