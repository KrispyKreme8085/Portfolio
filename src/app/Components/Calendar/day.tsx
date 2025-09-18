import styles from "./calendar.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

interface DayProps {
  day: number | null;
  isToday: boolean;
  size: number;
}

export default function Day({ day, isToday, size }: DayProps) {
    const [width, setNewWidth] = useState(700);
    
    useEffect(() => {
        if (size === 400) {
            setNewWidth(50);
        } else if (size === 500) {
            setNewWidth(43); 
        } else if (size === 600) {
            setNewWidth(55); 
        } else if (size === 700) {
            setNewWidth(70); 
        } else if (size === 800) {
            setNewWidth(105); 
        }
    
    }, [size]);


    if (day === null) {
        return <div className={styles.empty} style={{width: width}}></div>;
    }

    return (
        <div className={styles.day} style={{width: width}}>
            <div>
            {isToday && (
                <Image
                    src="/star.png"
                    width={15}
                    height={15}
                    alt="star"
                    className={styles.star}
                />
                )}
            <h4>{day}</h4>
        </div>
        <p>Description</p>
        </div>
    );
}
