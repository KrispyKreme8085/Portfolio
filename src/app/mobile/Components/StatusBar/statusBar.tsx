"use client";

import styles from './statusBar.module.css';
import { useState, useEffect, use } from 'react';

export default function StatusBar() {

    const [batteryLevel, setBatteryLevel] = useState(100);
    const [time, setTime] = useState("");
    const [signalStrength, setSignalStrength] = useState(3);
    const [isOneOn, setIsOneOn] = useState(false);
    const [isTwoOn, setIsTwoOn] = useState(false);
    const [isThreeOn, setIsThreeOn] = useState(false);

    useEffect(() => {
        const updateBatteryLevel = () => {
            setBatteryLevel(Math.floor(Math.random() * 101));
        }

        updateBatteryLevel();
    }, []);

    useEffect(() => {
        const updateSignalStrength = () => {
            const newStrength = Math.floor(Math.random() * 3) + 1;
            setSignalStrength(newStrength);
        }

        updateSignalStrength();
    }, []);

    useEffect(() => {
        const updateSignalStrength = () => {
            if (signalStrength === 1) {
                setIsOneOn(true);
                setIsTwoOn(false);
                setIsThreeOn(false);
            } else if (signalStrength === 2) {
                setIsOneOn(true);
                setIsTwoOn(true);
                setIsThreeOn(false);
            } else if (signalStrength === 3) {
                setIsOneOn(true);
                setIsTwoOn(true);
                setIsThreeOn(true);
            }
        }

        updateSignalStrength();
    }, [signalStrength]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            setTime(formatted);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.statusBar}>
            <div className={styles.signal}>
                <div className={styles.topBar} style={isThreeOn ? {backgroundColor: "white"} : {}}></div>
                <div className={styles.middleBar} style={isTwoOn ? {backgroundColor: "white"} : {}}></div>
                <div className={styles.bottomBar} style={isOneOn ? {backgroundColor: "white"} : {}}></div>
            </div>
            <p>{time}</p>
            <div className={styles.battery}>
                <div className={styles.mainBattery}>
                    <div className={styles.percentage} style={{width: `${batteryLevel}%`}}></div>
                </div>
                <div className={styles.batteryTop} style={batteryLevel == 100 ? {backgroundColor: "green"} : {}}></div>
            </div>
        </div>
    );
}