"use client";

import Image from "next/image";
import { useState } from "react";

function Square({ value, onSquareClick, highlight }) {
  return (
    <button
      className={`square ${highlight ? "highlight" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, winnerSquares }) {
  function handleClick(i) {
    if (findWinner(squares) || squares[i]) {
      return;
    }

    const nextSquare = squares.slice();
    nextSquare[i] = xIsNext ? "X" : "O";
    onPlay(nextSquare);
  }

  const winner = findWinner(squares);
  const isTie = squares.every((squares) => squares != null) && !winner;
  let status;
  /*if(winner){
    status = 'Winner:' + winner;
  } else {
    status = 'Next move:' + (xIsNext ? 'X' : 'O');
  }*/

  if (winner) {
    status = "Winner:" + winner;
  } else if (isTie) {
    status = "It's tie!";
  } else {
    status = "Next move:" + (xIsNext ? "X" : "O");
  }

  const rows = [];
  for (let i = 0; i < 3; i++) {
    rows.push(
      <div className="boardRow" key={i}>
        {squares.slice(i * 3, i * 3 + 3).map((value, index) => {
          const squareIndex = i * 3 + index;
          const isWinner = winnerSquares && winnerSquares.includes(squareIndex);
          return (
            <Square
              key={squareIndex}
              value={value}
              onSquareClick={() => handleClick(squareIndex)}
              highlight={isWinner}
            />
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winnerSquares = findWinner(currentSquares);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = " move #" + move;
    } else {
      description = " start";
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          <p>You're at{description}</p>
        ) : (
          <button onClick={() => jumpTo(move)}>Go to{description}</button>
        )}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winnerSquares={winnerSquares}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function findWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}
