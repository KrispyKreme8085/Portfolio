"use client";
import { useEffect, useState } from "react";
import styles from "./hotbar.module.css";

interface HotbarProps {
    onClose: () => void;
    onOpen: () => void;
    isOpen: boolean;
}

export default function Hotbar({onClose, onOpen, isOpen}: HotbarProps) {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                // second: "2-digit",
            });
            setTime(formatted);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        const formattedDate = now.toLocaleDateString(undefined, options);
        setDate(formattedDate);
    }, []);

    return (
        <div className={styles.hotbar}>
            <div className={styles.items} id={styles.left}>
                {/* <p id={styles.home}>PORTFOLIO</p> */}
            </div>
            <div className={styles.items} id={styles.right}>
                <p id={styles.date}>{date}</p>
                <p id={styles.time}>{time}</p>
            </div>
        </div>
    );
}
