"use client";

import { ReactNode, useState } from 'react';
import styles from './popUp.module.css';
import PopUpHeader from './popUpHeader';

interface PopUpProps {
    title: string;
    content: ReactNode;
    onClose: () => void;

}

export default function PopUp({ title, content, onClose }: PopUpProps) {
    const [size, setSize] = useState(450);

    const increaseSize = () => setSize(prev => Math.min(800, prev + 100));
    const decreaseSize = () => setSize(prev => Math.max(400, prev - 100));

    return (
        <div 
            className={styles.popUp} 
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            <PopUpHeader onIncrease={increaseSize} onDecrease={decreaseSize} onClose={onClose} title={title}/>
            <div className={styles.background}>
                {/* <p>p:// $ port.showText</p> */}
                <div>{content}</div>
            </div>
        </div>
    );
}
