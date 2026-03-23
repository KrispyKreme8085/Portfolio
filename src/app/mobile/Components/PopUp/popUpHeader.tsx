import styles from './popUp.module.css';
import Image from 'next/image';

type PopUpHeaderProps = {   
    onClose: () => void;
    title: string;
};

export default function PopUpHeader({ onClose, title }: PopUpHeaderProps) {
    return (
        <div className={styles.popUpHeader}>
            <Image onClick={onClose} id={styles.img} src="/images/close.png" width={20} height={20} alt='close' />
            <h1>{title}</h1>
        </div>
    );
}
