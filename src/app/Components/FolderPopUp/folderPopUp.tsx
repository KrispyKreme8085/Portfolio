"use client";
import Folder from "../Folder/folder";
import PopUp from "../PopUp/popUp";
import Minesweeper from "../Minesweeper/minesweeper";
import { useState, useEffect } from "react";
import styles from "./folderPopUp.module.css";

interface Props {
  name: string;
  image?: string;
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}

export default function FolderPopUp({ name, image, onOpen, onClose, isOpen }: Props) {
  const [content, setContent] = useState<string>("");
  const [formattedImage, setImage] = useState("");

  useEffect(() => {
    if (image == null) {
      setImage("folderclosed")
      if (isOpen) {
        if (content == "") {
          setImage("folderopened")
        } else {
          setImage("folderopenedpage")
        }
      }
    } else {
      setImage(image)
    }
  }, [image, isOpen, content]);


  useEffect(() => {
    if (isOpen && name !== "Minesweeper") {
      fetch(`/texts/${name}.txt`)
        .then((res) => res.text())
        .then((text) => {
          const html = text
            .replace(
              /---\s*(.*?)\s*---/g, `<h1 class="${styles.bodyTitle}">--- $1 ---</h1>`
            )

            .replace(
              /\b(https?:\/\/[^\s]+)/g,
              '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
            )

            .replace(
              /\bmailto:([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,})\b/g,
              '<a href="mailto:$1">$1</a>'
            );

          setContent(html);
        })
        .catch(() => setContent("Error loading file"));
    }
  }, [isOpen, name]);

  return (
    <div className={styles.container}>
      <Folder
        name={name}
        image={formattedImage}
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
                <div
                  className={styles.text}

                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontFamily: "monospace",
                  }}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              }
              onClose={onClose}
            />
          )}
        </div>
      )}
    </div>
  );
}
