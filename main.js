const WIDTH = 25;
const HEIGHT = 20;

const gol = new GameOfLife(WIDTH, HEIGHT);

const tds = [];

const table = document.createElement('tbody');

for (let i = 0; i < HEIGHT; i++) {
  let tr = document.createElement('tr');
  for (let j = 0; j < WIDTH; j++) {
    let td = document.createElement('td');
    td.dataset.row = i;
    td.dataset.col = j;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById('board').append(table);

const draw = () => {
  tds.forEach((td) => {
    if (gol.getCell(td.dataset.row, td.dataset.col) === 1) {
      td.classList.add('alive');
    } else {
      td.classList.remove('alive');
    }
  });
};

document.getElementById('board').addEventListener('click', (event) => {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  gol.toggleCell(row, col);
  draw();
});

document.getElementById('step_btn').addEventListener('click', (event) => {
  gol.playGame();
  draw();
});

let on = 0;
let playing;
document.getElementById('play_btn').addEventListener('click', (event) => {
  on = 1 - on;
  if (on) {
    playing = setInterval(() => {
      gol.playGame();
      draw();
    }, 1000);
    document.getElementById('play_btn').innerHTML = 'Stop';
  } else {
    clearInterval(playing);
    document.getElementById('play_btn').innerHTML = 'Play';
  }
});

document.getElementById('random_btn').addEventListener('click', (event) => {
  for (let i = 0; i < gol.height; i++) {
    for (let j = 0; j < gol.width; j++) {
      if (Math.random() * 10 < 4) {
        gol.board[i][j] = 1;
      } else {
        gol.board[i][j] = 0;
      }
    }
  }
  draw();
});

document.getElementById('clear_btn').addEventListener('click', (event) => {
  for (let i = 0; i < gol.height; i++) {
    for (let j = 0; j < gol.width; j++) {
      gol.board[i][j] = 0;
    }
  }
  draw();
});
