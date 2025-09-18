"use client";
import Folder from "../Folder/folder";
import PopUp from "../PopUp/popUp";
import { useState, useEffect } from "react";

interface Props {
  name: string;
  image: string;
}

export default function FolderPopUp({ name, image }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<string>("");

  const closePopUp = () => setIsOpen(false);
  const openPopUp = () => setIsOpen(true);

  useEffect(() => {
    if (isOpen) {
      fetch(`/texts/${name}.txt`)
        .then((res) => res.text())
        .then(setContent)
        .catch(() => setContent("Error loading file"));
    }
  }, [isOpen, name]);

  return (
    <div>
      <Folder name={name} image={image} onOpen={openPopUp} />
      {isOpen ? (
        <PopUp title={name} content={<pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>} onClose={closePopUp} />
      ) : null}
    </div>
  );
}
