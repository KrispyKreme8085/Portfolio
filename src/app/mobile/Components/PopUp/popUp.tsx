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
    const size = 90;

    return (
        <div 
            className={styles.popUp} 
            style={{ width: `${size}vw`, height: `70vh` }}
        >
            <PopUpHeader onClose={onClose} title={title}/>
            <div className={styles.background}>
                {/* <p>p:// $ port.showText</p> */}
                <div>{content}</div>
            </div>
        </div>
    );
}