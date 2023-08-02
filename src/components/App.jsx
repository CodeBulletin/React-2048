import { useState, useEffect } from 'react';
import '../componentscss/App.css';
import Board from './Board';

function addRandomTile(board) {
  const emptyTiles = board.reduce((acc, row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 0) {
        acc.push({ row: rowIndex, col: colIndex });
      }
    });
    return acc;
  }, []);

  if (emptyTiles.length > 0) {
    const randomTileIndex = Math.floor(Math.random() * emptyTiles.length);
    const { row, col } = emptyTiles[randomTileIndex];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
  return board;
}

function moveLeft(board, score) {
  board = board.map((row) => {
    let newRow = row.filter((value) => value != 0);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {
        score += 2 * newRow[i];
        newRow[i] *= 2;
        newRow[i + 1] = 0;
      }
    }
    // newRow = row.filter((value) => value !== 0);
    while (newRow.length < 4) {
      newRow.push(0);
    }
    return newRow;
  });
  return [board, score];
}

function rotateBoard(board) {
  const n = board.length;
  const rotatedMatrix = new Array(n).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotatedMatrix[i][j] = board[n - j - 1][i];
    }
  }

  return rotatedMatrix;
}

function move(board, direction, score) {
  if (direction === "down") {
    board = rotateBoard(board);
  }
  else if (direction === "up") {
    board = rotateBoard(board);
    board = rotateBoard(board);
    board = rotateBoard(board);
  }
  else if (direction === "right") {
    board = rotateBoard(board);
    board = rotateBoard(board);
  }

  [board, score] = moveLeft(board, score);
  board = addRandomTile(board);
  board = board.map((row) => {
    let newRow = row.filter((value) => value != 0);
    while (newRow.length < 4) {
      newRow.push(0);
    }
    return newRow;
  });

  if (direction === "down") {
    board = rotateBoard(board);
    board = rotateBoard(board);
    board = rotateBoard(board);
  }
  else if (direction === "up") {
    board = rotateBoard(board);
  }
  else if (direction === "right") {
    board = rotateBoard(board);
    board = rotateBoard(board);
  }

  return [board, score];
}

function isGameOver(board) {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        return false;
      }
    }
  }

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        (row < 3 && board[row][col] === board[row + 1][col]) ||
        (col < 3 && board[row][col] === board[row][col + 1]) 
      ) {
        return false;
      }
    }
  }

  return true;
}

function deepCopy(board) {
  return board.map(row => row.slice());
}

function App() {
  // Generate two random row and column indices

  const onFirstLoad = () => {
  
    let initialBoard = Array.from(Array(4), () => new Array(0, 0, 0, 0));

    initialBoard = addRandomTile(initialBoard);
    initialBoard = addRandomTile(initialBoard);

    return initialBoard;
  }

  const restart = () => {
    setBoard(onFirstLoad);
    setScore(0);
    setGameOver(false);
  }

  const [board, setBoard] = useState(onFirstLoad());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const onKeyDown = (event) => {
    let arr = deepCopy(board);
    let s = score;
    switch (event.key) {
      case 'a':
        [arr, s] = move(arr, "left", s);
        break;
      case 'd':
        [arr, s] = move(arr, "right", s);
        break;
      case 's':
        [arr, s] = move(arr, "down", s);
        break;
      case 'w':
        [arr, s] = move(arr, "up", s);
        break;
      case 'p':
        arr = onFirstLoad();
        s = 0;
        setGameOver(false);
        break;
    }
    setScore(s);
    setBoard(arr);
    setGameOver(isGameOver(arr));
  }

  useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener('keydown', onKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [board]);

  return (
    <div className="App">
      <span>Score : {score}</span>
      <div className='rel'>
        <Board board={board}/>
        {
          gameOver ? (
            <div className = "gameover">
              <h1>GameOver</h1>
              <button onClick={restart}>Restart</button>
            </div>
          ) : (
            <></>
          )
        }
      </div>
    </div>
  )
}

export default App
