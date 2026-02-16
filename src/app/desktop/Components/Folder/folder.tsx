import styles from "./folder.module.css";
import Image from "next/image";

interface FolderProps {
    name: string;
    image: string;
    onOpen: () => void;  
    size: number;    
}

export default function Folder({name, image, onOpen, size }: FolderProps ) {
    return (
        <div className={styles.folder} onClick={onOpen} >
            <Image
                src={`/images/${image}.png`}
                alt="Folder Icon"
                width={size}
                height={size}
            />
            <h2>{name}</h2>
        </div>
    );
}