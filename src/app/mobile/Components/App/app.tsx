import styles from './app.module.css';
import AppIcon from '../AppIcon/appIcon';
import PopUp from '../PopUp/popUp';
import { useState, useEffect } from 'react';
import { div } from 'framer-motion/client';

interface Props {
  name: string;
  image: string;
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}

export default function App({ name, image, onOpen, onClose, isOpen }: Props) {

    const [content, setContent] = useState<string>("");

    useEffect(() => {
        if (isOpen && name !== "Minesweeper") {
        fetch(`/texts/${name}.txt`)
            .then((res) => res.text())
            .then((text) => {
            const html = text
                .replace(
                    /---\s*(.*?)\s*---/g,
                    `<p class="${styles.bodyTitle}">--- $1 ---</p>`
                )
                .replace(
                    /\b(https?:\/\/[^\s]+)/g,
                    '<a href="$1" target="_blank">$1</a>'
                )
                .replace(
                    /\bmailto:([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,})\b/g,
                    '<a href="mailto:$1">$1</a>'
                )
                .replace(
                    /!!(.*?)!!/g,
                    '<strong style="color: red; margin-bottom: -30px; display: block; text-align: center;">$1</strong>'
                )

            setContent(html);
            })
            .catch(() => setContent("Error loading file"));
        }
    }, [isOpen, name]);

    return (
        <div className={styles.container}>
            <AppIcon name={name} image={image} onOpen={onOpen}></AppIcon>
            {isOpen && (
                <div className={styles.popupFixed}>
                    <PopUp title={name} onClose={onClose} 
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
                    />
                </div>
            )}
        </div>
    );
}