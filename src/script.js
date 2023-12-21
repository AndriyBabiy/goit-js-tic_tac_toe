/**
 * Create a tic-tac-toe game.
 * Create markdown for a game-field container that has a class 'content', and attribute each box the class 'item'
 * Realise delegated events on the game-field to facilitate player moves
 * The script should independently declare the winner and return the result in a modular window stating the winner (X/O)
 * For the move history of each player (X/O), each of the game-field boxes should contain a data attribute 'id' corresponding to the box number
 * Create a script that checks winninng combinations, the list of all possible winning combintations is available in the array 'combinations'.
 * For the dispaly of the modular window us the 'basiclightbox' library
 * After decalring a winner reset the game-field.
 */

const combination = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [1, 5, 9],
  [3, 5, 7],
  [3, 6, 9],
];

const content = document.querySelector('.js-content');
historyX = [];
historyO = [];
let player = 'X';

content.insertAdjacentHTML('afterbegin', createMarkup());
content.addEventListener('click', handlerClick);

function checkWinner(history) {
  return combination.some((item) => item.every((id) => history.includes(id)));
}

function createMarkup() {
  let markup = '';
  
  for (let i = 1; i < 10; i++) {
    markup += `<div class="item js-item" data-id="${i}"></div>`;
  }
  
  return markup;
}

function handlerClick({ target }) {
  if (!target.classList.contains('js-item') || target.textContent) {
    return;
  }

  const id = Number(target.dataset.id);
  let isWinner = false;

  if (player === 'X') {
    historyX.push(id);
    isWinner = historyX.length >= 3 && checkWinner(historyX);
  } else {
    historyO.push(id);
    isWinner = historyO.length >= 3 && checkWinner(historyO);
  }
  
  target.textContent = player;
  
  if (isWinner) {
    showWinner(player);
    resetGame();
    return;
  } else if (historyX.length === 5) {
    showDraw();
    resetGame();
    return;
  }

  player = player === 'X' ? 'O' : 'X';
}

function resetGame() {
  content.innerHTML = createMarkup();
  historyX.splice(0, historyX.length);
  historyO.splice(0, historyO.length);
  player = 'X';
}

function showWinner(winner) {
  const instance = basicLightbox.create(
    `
    <div class="box">
      <h1>Player ${winner} - is the winner!</h1>
    </div>>
    `,
      {
        handler: null,
        onShow(instance) {
          this.handler = onEscape.bind(instance);
          document.addEventListener('keydown', this.handler);
        },
        onClose() {
          document.removeEventListener('keydown', this.handler);
        }
      }
  )
  instance.show();
}

function showDraw() {
  const instance = basicLightbox.create(
    `
    <div class="box">
      <h1>Its a draw!</h1>
    </div>>
    `,
      {
        handler: null,
        onShow(instance) {
          this.handler = onEscape.bind(instance);
          document.addEventListener('keydown', this.handler);
        },
        onClose() {
          document.removeEventListener('keydown', this.handler);
        }
      }
  )
  instance.show();
}

function onEscape({ code }) {
  if (code === 'Escape') {
    console.log(this);
    this.close();
  }
}