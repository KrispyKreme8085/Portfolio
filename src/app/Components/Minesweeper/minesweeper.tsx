"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./minesweeper.module.css";
import Image from "next/image";

interface MinesweeperProps {
  onClose: () => void;
}

interface Cell {
  isBomb: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacent: number;
}

export default function Home({ onClose }: MinesweeperProps) {
  const boxesW = 15;
  const boxesH = 15;
  const bombCount = 30;
  const totalBoxes = boxesW * boxesH;

  const [grid, setGrid] = useState<Cell[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);

  // Generate grid
  const initGrid = useCallback(() => {
    const cells: Cell[] = Array.from({ length: totalBoxes }, () => ({
      isBomb: false,
      isRevealed: false,
      isFlagged: false,
      adjacent: 0,
    }));

    // Place bombs
    let bombsPlaced = 0;
    while (bombsPlaced < bombCount) {
      const i = Math.floor(Math.random() * totalBoxes);
      if (!cells[i].isBomb) {
        cells[i].isBomb = true;
        bombsPlaced++;
      }
    }

    // Calculate adjacency
    const dirs = [
      -1,
      1,
      -boxesW,
      boxesW,
      -boxesW - 1,
      -boxesW + 1,
      boxesW - 1,
      boxesW + 1,
    ];

    cells.forEach((cell, i) => {
      if (cell.isBomb) return;

      let count = 0;
      dirs.forEach((d) => {
        const ni = i + d;
        const nx = ni % boxesW;
        const ny = Math.floor(ni / boxesW);

        if (nx >= 0 && nx < boxesW && ny >= 0 && ny < boxesH) {
          if (cells[ni]?.isBomb) count++;
        }
      });

      cell.adjacent = count;
    });

    setGrid(cells);
    setGameOver(false);
    setWin(false);
    setScore(0);
  }, [boxesW, boxesH, bombCount, totalBoxes]);

  useEffect(() => {
    initGrid();
  }, [initGrid]);

  const revealCell = (i: number) => {
    if (gameOver || win) return;

    const newGrid = [...grid];
    const cell = newGrid[i];

    if (cell.isRevealed || cell.isFlagged) return;

    cell.isRevealed = true;

    if (cell.isBomb) {
      setGameOver(true);
      setGrid(newGrid);
      return;
    }

    setScore((prev) => prev + 1);

    if (cell.adjacent === 0) {
      const dirs = [
        -1,
        1,
        -boxesW,
        boxesW,
        -boxesW - 1,
        -boxesW + 1,
        boxesW - 1,
        boxesW + 1,
      ];

      dirs.forEach((d) => {
        const ni = i + d;
        const nx = ni % boxesW;
        const ny = Math.floor(ni / boxesW);

        if (nx >= 0 && nx < boxesW && ny >= 0 && ny < boxesH) {
          if (!newGrid[ni].isRevealed) {
            revealCell(ni);
          }
        }
      });
    }

    setGrid(newGrid);

    if (newGrid.filter((c) => !c.isRevealed && !c.isBomb).length === 0) {
      setWin(true);
    }
  };

  const toggleFlag = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    if (gameOver || win) return;

    const newGrid = [...grid];
    newGrid[i].isFlagged = !newGrid[i].isFlagged;
    setGrid(newGrid);
  };

  return (
    <div className={styles.popUp}>
      <div className={styles.popUpHeader}>
        <Image
          onClick={onClose}
          id={styles.img}
          src="/images/close.png"
          width={20}
          height={20}
          alt="close"
        />
        <h1>Minesweeper</h1>
        <p>Score: {score}</p>
      </div>

      <div className={styles.background}>
        {(gameOver || win) && (
          <div className={styles.endScreen}>
            <h2>{win ? "You Win!" : "Game Over!"}</h2>
            <button onClick={initGrid}>Restart</button>
          </div>
        )}

        <div
          className={styles.grid}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${boxesW}, 25px)`,
            gridTemplateRows: `repeat(${boxesH}, 25px)`,
            gap: "1px",
          }}
        >
          {grid.map((cell, i) => (
            <div
              key={i}
              className={styles.cell}
              onClick={() => revealCell(i)}
              onContextMenu={(e) => toggleFlag(e, i)}
              style={{
                width: "25px",
                height: "25px",
                background: cell.isRevealed
                  ? cell.isBomb
                    ? "red"
                    : "#ddd"
                  : "#666",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {cell.isRevealed && !cell.isBomb && cell.adjacent > 0
                ? cell.adjacent
                : ""}
              {!cell.isRevealed && cell.isFlagged && (
                <Image
                  src="/images/sweeperFlag.png"
                  alt="Flag"
                  width={15}
                  height={17}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
