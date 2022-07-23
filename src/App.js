import './App.css';
import Board from "./Board";
import Square from "./Square";
import {useState, useEffect} from 'react';

const defaultSquares = () => (new Array(110)).fill(null);

const lines = [
  [0,1,2],[3,4,5],[6,7,8],
  [7,8,9],[10,11,12],[13,14,15],
  [16,17,18],[17,18,19],[20,21,22],
  [23,24,25],[26,27,28],[27,28,29],
  [30,31,32],[33,34,35],[36,37,38],
  [37,38,39],[40,41,42],[43,44,45],
  [46,47,48],[47,48,49],[50,51,52],
  [53,54,55],[56,57,58],[57,58,59],
  [60,61,62],[63,64,65],[66,67,68],
  [67,68,69],[70,71,72],[73,74,75],
  [76,77,78],[77,78,79],[80,81,82],
  [83,84,85],[86,87,88],[87,88,89],
  [90,91,92],[93,94,95],[96,97,98],
  [97,98,99],[100,101,102],[103,104,105],
  [106,107,108],[107,108,109],[0,10,20],
  [30,40,50],[60,70,80],[80,90,100],
  [1,11,21],[31,41,51],[61,71,81],[81,91,101],
  [2,12,22],[32,42,52],[62,72,82],[82,92,102],
  [3,13,23],[33,43,53],[63,73,83],[83,93,103],
  [4,14,24],[34,44,54],[64,74,84],[84,94,104],
  [5,15,25],[35,45,55],[65,75,85],[85,95,105],
  [6,16,26],[36,46,56],[66,76,86],[86,96,106],
  [7,17,27],[37,47,57],[67,77,87],[87,97,107],
  [8,18,28],[38,48,58],[68,78,88],[88,98,108],
  [9,19,29],[39,49,59],[69,79,89],[89,99,109],
  

];

function App() {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner,setWinner] = useState(null);

  useEffect(() => {
    const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1;
    const linesThatAre = (a,b,c) => {
      return lines.filter(squareIndexes => {
        const squareValues = squareIndexes.map(index => squares[index]);
        return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareValues.sort());
      });
    };
    const emptyIndexes = squares
      .map((square,index) => square === null ? index : null)
      .filter(val => val !== null);
    const playerWon = linesThatAre('x', 'x', 'x').length > 0;
    const computerWon = linesThatAre('o', 'o', 'o').length > 0;
    if (playerWon) {
      setWinner('x');
    }
    if (computerWon) {
      setWinner('o');
    }
    const putComputerAt = index => {
      let newSquares = squares;
      newSquares[index] = 'o';
      setSquares([...newSquares]);
    };
    if (isComputerTurn) {

      const winingLines = linesThatAre('o', 'o', null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(index => squares[index] === null)[0];
        putComputerAt(winIndex);
        return;
      }

      const linesToBlock = linesThatAre('x', 'x', null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(index => squares[index] === null)[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre('o', null, null);
      if (linesToContinue.length > 0) {
        putComputerAt(linesToContinue[0].filter(index => squares[index] === null)[0]);
        return;
      }

      const randomIndex = emptyIndexes[ Math.ceil(Math.random()*emptyIndexes.length) ];
      putComputerAt(randomIndex);
    }
  }, [squares]);



  function handleSquareClick(index) {
    const isPlayerTurn = squares.filter(square => square !== null).length % 2 === 0;
    if (isPlayerTurn) {
      let newSquares = squares;
      newSquares[index] = 'x';
      setSquares([...newSquares]);
    }
  }

  return (
    <main>
      <Board>
        {squares.map((square,index) =>
          <Square
            x={square==='x'?1:0}
            o={square==='o'?1:0}
            onClick={() => handleSquareClick(index)} />
        )}
      </Board>
      {!!winner && winner === 'x' && (
        <div className="result green">
          You WON!
        </div>
      )}
      {!!winner && winner === 'o' && (
        <div className="result red">
          You LOST!
        </div>
      )}

    </main>
  );
}

export default App;