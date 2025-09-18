import styles from './popUp.module.css';
import Image from 'next/image';

type PopUpHeaderProps = {
    onIncrease: () => void;
    onDecrease: () => void;    
    onClose: () => void;
    title: string;
};

export default function PopUpHeader({ onIncrease, onDecrease, onClose, title }: PopUpHeaderProps) {
    return (
        <div className={styles.popUpHeader}>
            <Image onClick={onClose} id={styles.img} src="/close.png" width={20} height={20} alt='close' />
            <h1>{title}</h1>
            <div className={styles.buttons}>
                <p onClick={onIncrease} style={{ cursor: "pointer" }}>+</p>
                <p onClick={onDecrease} style={{ cursor: "pointer" }}>-</p>
            </div>
        </div>
    );
}
