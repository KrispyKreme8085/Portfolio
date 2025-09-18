"use client";
import { useEffect, useState } from "react";
import styles from "./hotbar.module.css";
import Image from "next/image";

export default function Hotbar() {
    const [time, setTime] = useState("");

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

    return (
        <div className={styles.hotbar}>
            <div className={styles.items} id={styles.left}>
                <p id={styles.home}>PORTFOLIO</p>
                <div id={styles.calendar}>
                    <Image src="/calendar.png" width={40} height={40} alt="Calendar"></Image>
                </div>
            </div>
            <div className={styles.items} id={styles.right}>
                <p id={styles.time}>{time}</p>
            </div>
        </div>
    );
}
