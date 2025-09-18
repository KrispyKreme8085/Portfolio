"use client"

import styles from './calendar.module.css';
import { useState, useEffect } from 'react';

interface DaysProps {
    size: number;
}

export default function DaysHeader({ size }: DaysProps) {
    const [width, setNewWidth] = useState(700);

    useEffect(() => {
        if (size === 400) {
            setNewWidth(30);
        } else if (size === 500) {
            setNewWidth(43); 
        } else if (size === 600) {
            setNewWidth(55); 
        } else if (size === 700) {
            setNewWidth(70); 
        } else if (size === 800) {
            setNewWidth(85); 
        }

    }, [size]);

    return (
        <div className={styles.days}>
            <h4 style={{width: width}}>Sun</h4>
            <h4 style={{width: width}}>Mon</h4>
            <h4 style={{width: width}}>Tues</h4>
            <h4 style={{width: width}}>Wens</h4>
            <h4 style={{width: width}}>Thurs</h4>
            <h4 style={{width: width}}>Fri</h4>
            <h4 style={{width: width}}>Sat</h4>
        </div>
    );
}
