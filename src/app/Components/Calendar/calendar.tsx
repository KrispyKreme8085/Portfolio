"use client";

import styles from "./calendar.module.css";
import PopUpHeader from "../PopUp/popUpHeader";
import DaysHeader from "./daysHeader";
import Day from "./day"; 
import { useState } from "react";

export default function Calendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState(700);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayIndex = new Date(year, month, 1).getDay();

  const calendarDays: (number | null)[] = [
    ...Array(firstDayIndex).fill(null), 
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1), 
  ];

  const closePopUp = () => setIsOpen(false);
  const openPopUp = () => setIsOpen(true);
  const increaseSize = () => setSize((prev) => Math.min(800, prev + 100));
  const decreaseSize = () => setSize((prev) => Math.max(400, prev - 100));

  return (
    <div
      className={styles.calendar}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <PopUpHeader
        onIncrease={increaseSize}
        onDecrease={decreaseSize}
        onClose={closePopUp}
        title="Calendar"
      ></PopUpHeader>

      <div className={styles.dates}>
        <DaysHeader size={size} />

        <div className={styles.grid}>
          {calendarDays.map((day, idx) => (
            <Day
              key={idx}
              day={day}
              isToday={day === today.getDate()}
              size={size}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
