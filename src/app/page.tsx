'use client'

import styles from "./page.module.css";
import Hotbar from "./Components/Hotbar/hotbar";
import FolderPopUp from "./Components/FolderPopUp/folderPopUp";
import { useState, useMemo } from "react";
import ErrorScreen from "./Components/ErrorScreen/errorScreen";

export default function Home() {
  const folders = [
    { name: "Space", image: "folderclosed" },
    { name: "Lebron", image: "folderclosed" },
    { name: "Folder McFolder", image: "folderclosed" },
    { name: "Minesweeper", image: "sweeperFlag" }
  ];

  const [openFolder, setOpenFolder] = useState<number | null>(null);
  const closePopUp = () => setOpenFolder(null);
  const openPopUp = (index: number) => setOpenFolder(index);

  const [error, setError] = useState<Error | null>(null);
  const resetError = () => setError(null);

  const gridSizeX = 9;
  const gridSizeY = 4;
  const totalSquares = gridSizeX * gridSizeY;

  const randomPositions = useMemo(() => {
    const used = new Set<number>();
    return folders.map(() => {
      let idx: number;
      do {
        idx = Math.floor(Math.random() * totalSquares);
      } while (used.has(idx));
      used.add(idx);
      return idx;
    });
  }, [folders.length, totalSquares]);

  const gridCells = useMemo(() => {
    return Array.from({ length: totalSquares }).map((_, index) => {
      const folderIndex = randomPositions.indexOf(index);
      const folderId = folderIndex !== -1 ? folderIndex + 1 : null; 
      return { index, folderIndex, folderId };
    });
  }, [randomPositions, totalSquares]);

  const triggerError = () => {
  try {
    throw new Error("This is a test error!");
  } catch (err) {
    setError(err as Error);
  }
};


  return (
    <div className={styles.page}>

      {
      error ? <ErrorScreen error={error} reset={resetError}></ErrorScreen>
      :
      <div className={styles.body}>
        <button onClick={triggerError}>Test Error</button>
        <Hotbar
          isOpen={openFolder === 0}
          onOpen={() => openPopUp(0)}
          onClose={closePopUp}
        />

        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${gridSizeX}, 190px)`,
            gridTemplateRows: `repeat(${gridSizeY}, 190px)`,
          }}
        >
          {gridCells.map(({ index, folderIndex, folderId }) => (
            <div
              key={index}
              className={styles.cell}
              style={{
                zIndex: openFolder === folderId ? 1000 : 1, 
              }}
            >
              {folderId !== null && folderIndex !== -1 && (
                <FolderPopUp
                  key={`folder-${folderIndex}`}
                  name={folders[folderIndex].name}
                  image={folders[folderIndex].image}
                  onOpen={() => openPopUp(folderId)}
                  onClose={closePopUp}
                  isOpen={openFolder === folderId}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    }
    </div>
  );
}
