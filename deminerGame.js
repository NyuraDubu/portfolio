let grid = [];
let gridSize = 10;
let mineCount = 10; // Reduced number of mines
let gameOver = false;

// Function to create the Minesweeper grid
function createDeminierGrid() {
    const gameContainer = document.getElementById('deminerGame');
    gameContainer.innerHTML = '';
    grid = [];
    gameOver = false;

    // Initialize the grid
    for (let row = 0; row < gridSize; row++) {
        grid[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);
            cell.addEventListener('click', revealCell);
            gameContainer.appendChild(cell);
            grid[row][col] = { isMine: false, revealed: false, element: cell };
        }
    }

    // Place mines
    let placedMines = 0;
    while (placedMines < mineCount) {
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);
        if (!grid[row][col].isMine) {
            grid[row][col].isMine = true;
            placedMines++;
        }
    }
}

// Function to reveal a cell
function revealCell(event) {
    if (gameOver) return;
    const row = event.target.getAttribute('data-row');
    const col = event.target.getAttribute('data-col');
    const cell = grid[row][col];

    if (cell.revealed) return;

    cell.revealed = true;
    cell.element.classList.add('revealed');

    if (cell.isMine) {
        cell.element.classList.add('mine');
        gameOver = true;
        revealAllMines();
        alert('Game Over! You hit a mine.');
    } else {
        const mineCount = countAdjacentMines(row, col);
        if (mineCount > 0) {
            cell.element.textContent = mineCount;
        } else {
            revealAdjacentCells(row, col); // No adjacent mines, reveal more cells
        }
    }
}

// Function to count adjacent mines around a cell
function countAdjacentMines(row, col) {
    let mineCount = 0;
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            let newRow = parseInt(row) + r;
            let newCol = parseInt(col) + c;
            if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                if (grid[newRow][newCol].isMine) {
                    mineCount++;
                }
            }
        }
    }
    return mineCount;
}

// Function to reveal adjacent cells recursively if there are no mines nearby
function revealAdjacentCells(row, col) {
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            let newRow = parseInt(row) + r;
            let newCol = parseInt(col) + c;
            if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && !grid[newRow][newCol].revealed) {
                revealCell({ target: grid[newRow][newCol].element });
            }
        }
    }
}

// Function to reveal all mines when the game is over
function revealAllMines() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col].isMine) {
                grid[row][col].element.classList.add('mine');
            }
        }
    }
}

// Function to open the Deminer game
function openDeminierGame() {
    document.getElementById('deminerGameContainer').style.visibility = 'visible';
    createDeminierGrid();
}

// Function to close the Deminer game
function closeDeminierGame() {
    document.getElementById('deminerGameContainer').style.visibility = 'hidden';
}
