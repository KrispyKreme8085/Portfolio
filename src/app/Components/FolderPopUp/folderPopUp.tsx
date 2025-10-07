"use client";
import Folder from "../Folder/folder";
import PopUp from "../PopUp/popUp";
import Minesweeper from "../Minesweeper/minesweeper";
import { useState, useEffect } from "react";
import styles from "./folderPopUp.module.css";

interface Props {
  name: string;
  image: string;
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}

export default function FolderPopUp({ name, image, onOpen, onClose, isOpen }: Props) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (isOpen && name !== "Minesweeper") {
      fetch(`/texts/${name}.txt`)
        .then((res) => res.text())
        .then(setContent)
        .catch(() => setContent("Error loading file"));
    }
  }, [isOpen, name]);

  return (
    <div className={styles.container}>
      <Folder
        name={name}
        image={image}
        onOpen={onOpen}
        size={name == "Minesweeper" ? 75 : 150}
      />

      {isOpen && (
        <div className={styles.popupFixed}>
          {name === "Minesweeper" ? (
            <Minesweeper onClose={onClose} />
          ) : (
            <PopUp
              title={name}
              content={
                <pre style={{ whiteSpace: "pre-wrap", padding: 0, margin: 0 }}>
                  {content}
                </pre>
              }
              onClose={onClose}
            />
          )}
        </div>
      )}
    </div>
  );
}
