"use client"

import styles from './appIcon.module.css';
import { useState } from 'react';

interface Props {
    name: string;
    image: string;
    onOpen: () => void;  
}

export default function AppIcon({ name, image, onOpen }: Props) {

    return (
        <div className={styles.appButton} onClick={onOpen}>
            <div className={styles.icon}>
                <img src={`/images/${image}.png`} alt="" />
            </div>
            <p>{name}</p>
        </div>
    );
}