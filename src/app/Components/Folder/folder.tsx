import styles from "./folder.module.css";
import Image from "next/image";

interface FolderProps {
    name: string;
    image: string;
    onOpen: () => void;    
}

export default function Folder({name, image, onOpen }: FolderProps ) {
    return (
        <div className={styles.folder} onClick={onOpen} >
            <Image
                src={`/${image}.png`}
                alt="Folder Icon"
                width={150}
                height={150}
            />
            <h2>{name}</h2>
        </div>
    );
}