'use client';

import styles from "./page.module.css";
import Hotbar from "./Components/Hotbar/hotbar";
import FolderPopUp from "./Components/FolderPopUp/folderPopUp";
import ErrorScreen from "./Components/ErrorScreen/errorScreen";
import { useState, useMemo, useEffect } from "react";
import BootScreen from "./Components/BootUp/bootup";

export default function Home() {
  const folders = [
    { name: "Contact Info" },
    { name: "Projects" },
    { name: "About Me"},
    { name: "Minesweeper", image: "sweeperFlag" },
  ];

  const [booted, setBooted] = useState(false);

  const [openFolder, setOpenFolder] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [gridSizeX, setGridSizeX] = useState(9);
  const gridSizeY = 4;

  const closePopUp = () => setOpenFolder(null);
  const openPopUp = (index: number) => setOpenFolder(index);

  useEffect(() => {
    const updateGridSize = () => {
      const width = window.innerWidth;

      if (width < 400) {
          setGridSizeX(1)
      } else if (width < 600) {
          setGridSizeX(2)
      } else if (width < 800) {
          setGridSizeX(3)
      } else if (width < 1000) {
          setGridSizeX(4)
      } else if (width < 1200) {
          setGridSizeX(5)
      } else if (width < 1400) {
          setGridSizeX(6)
      } else if (width < 1600) {
          setGridSizeX(7)
      } else if (width < 1800) {
          setGridSizeX(8)
      } else {
          setGridSizeX(9)
      }
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

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

  return (
    <>
      {!booted ? (
        <BootScreen onFinish={() => setBooted(true)} />
      ) : (
        <div className={styles.page}>
          {error ? (
            <ErrorScreen error={error} />
          ) : (
            <div className={styles.body}>
              {/* <button onClick={triggerError}>Test Error</button> */}
              <Hotbar />
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
          )}
        </div>
      )}
    </>
  );
}
