const boardWidth = 15; // Número de colunas do tabuleiro
const boardHeight = 20; // Número de linhas do tabuleiro
const blockSize = 30; // Tamanho do bloco em pixels

let board = [];
let currentPiece;
let currentPieceX;
let currentPieceY;
let score = 0;

function createBoard() {
    for (let row = 0; row < boardHeight; row++) {
        board.push(Array(boardWidth).fill(0));
    }
}

function createPiece() {
    const pieces = [
        [[1, 1, 1, 1]], // I
        [[1, 1], [1, 1]], // O
        [[1, 1, 1], [0, 1, 0]], // T
        [[0, 1, 1], [1, 1, 0]], // S
        [[1, 1, 0], [0, 1, 1]], // Z
        [[1, 1, 1], [0, 0, 1]], // J
        [[1, 1, 1], [1, 0, 0]]  // L
    ];

    const randomIndex = Math.floor(Math.random() * pieces.length);
    const piece = pieces[randomIndex];

    return piece;
}

function drawBoard() {
    let boardHtml = '';
    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            if (board[row][col] === 1) {
                boardHtml += `<div class="block" style="top:${row * blockSize}px;left:${col * blockSize}px;"></div>`;
            }
        }
    }
    document.getElementById('board').innerHTML = boardHtml;
    document.getElementById('board').style.width = `${boardWidth * blockSize}px`; // Ajusta a largura do tabuleiro
    document.getElementById('board').style.height = `${boardHeight * blockSize}px`; // Ajusta a altura do tabuleiro
}

function drawPiece() {
    currentPiece.forEach((row, rowIndex) => {
        row.forEach((block, colIndex) => {
            if (block === 1) {
                const pieceElement = document.createElement('div');
                pieceElement.className = 'block';
                pieceElement.style.top = `${(rowIndex + currentPieceY) * blockSize}px`;
                pieceElement.style.left = `${(colIndex + currentPieceX) * blockSize}px`;
                document.getElementById('board').appendChild(pieceElement);
            }
        });
    });
}

function clearBoard() {
    document.querySelectorAll('.block').forEach(block => block.remove());
}

function movePieceDown() {
    if (!checkCollision(currentPiece, currentPieceX, currentPieceY + 1)) {
        currentPieceY++;
        clearBoard();
        drawBoard();
        drawPiece();
    } else {
        mergePiece();
        clearLines();
        currentPiece = createPiece();
        currentPieceX = Math.floor(boardWidth / 2) - Math.floor(currentPiece[0].length / 2);
        currentPieceY = 0;
    }
}

function checkCollision(piece, x, y) {
    for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
            if (piece[row][col] === 1) {
                const boardX = x + col;
                const boardY = y + row;
                if (boardY >= boardHeight || boardX < 0 || boardX >= boardWidth || board[boardY][boardX] === 1) {
                    return true;
                }
            }
        }
    }
    return false;
}

function mergePiece() {
    currentPiece.forEach((row, rowIndex) => {
        row.forEach((block, colIndex) => {
            if (block === 1) {
                const boardX = currentPieceX + colIndex;
                const boardY = currentPieceY + rowIndex;
                board[boardY][boardX] = 1;
            }
        });
    });
}

function clearLines() {
    let linesCleared = 0;
    for (let row = boardHeight - 1; row >= 0; row--) {
        if (board[row].every(block => block === 1)) {
            board.splice(row, 1);
            board.unshift(Array(boardWidth).fill(0));
            linesCleared++;
        }
    }
    if (linesCleared > 0) {
        score += linesCleared * 100;
    }

    document.getElementById('score-value').textContent = score;

    drawBoard();
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (!checkCollision(currentPiece, currentPieceX - 1, currentPieceY)) {
                currentPieceX--;
                clearBoard();
                drawBoard();
                drawPiece();
            }
            break;
        case 'ArrowRight':
            if (!checkCollision(currentPiece, currentPieceX + 1, currentPieceY)) {
                currentPieceX++;
                clearBoard();
                drawBoard();
                drawPiece();
            }
            break;
        case 'ArrowDown':
            movePieceDown();
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
    }
}

function rotatePiece() {
    const rotatedPiece = [];
    for (let col = 0; col < currentPiece[0].length; col++) {
        const newRow = [];
        for (let row = currentPiece.length - 1; row >= 0; row--) {
            newRow.push(currentPiece[row][col]);
        }
        rotatedPiece.push(newRow);
    }

    if (!checkCollision(rotatedPiece, currentPieceX, currentPieceY)) {
        currentPiece = rotatedPiece;
        clearBoard();
        drawBoard();
        drawPiece();
    }
}

function init() {
    createBoard();
    currentPiece = createPiece();
    currentPieceX = Math.floor(boardWidth / 2) - Math.floor(currentPiece[0].length / 2);
    currentPieceY = 0;
    drawBoard();
    drawPiece();
    document.addEventListener('keydown', handleKeyPress);
    setInterval(movePieceDown, 1000);
}

init();
