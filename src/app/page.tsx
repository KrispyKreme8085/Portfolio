import styles from "./page.module.css";
import Hotbar from "./Components/Hotbar/hotbar";
import FolderPopUp from "./Components/FolderPopUp/folderPopUp";
import Calendar from "./Components/Calendar/calendar";

export default function Home() {
  const folders = [
    { name: "Space", image: "folderclosed" },
    { name: "Lebron", image: "folderclosed" },
    { name: "Folder McFolder", image: "folderclosed" },
  ];

  const gridSizeX = 9;
  const gridSizeY = 4;
  const totalSquares = gridSizeX * gridSizeY;

  const usedIndexes = new Set<number>();
  const randomPositions = folders.map(() => {
    let idx;
    do {
      idx = Math.floor(Math.random() * totalSquares);
    } while (usedIndexes.has(idx));
    usedIndexes.add(idx);
    return idx;
  });

  return (
    <div className={styles.page}>
      <Hotbar />
      <div className={styles.grid}  style={{gridTemplateColumns: `repeat(${gridSizeX}, 190px)`, gridTemplateRows: `repeat(${gridSizeY}, 190px)`}}>
        {Array.from({ length: totalSquares }).map((_, index) => {
          const folderIndex = randomPositions.indexOf(index);
          return (
            <div key={index} className={styles.cell}>
              {folderIndex !== -1 && (
                <FolderPopUp
                  name={folders[folderIndex].name}
                  image={folders[folderIndex].image}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* <Calendar /> */}
    </div>
  );
}
