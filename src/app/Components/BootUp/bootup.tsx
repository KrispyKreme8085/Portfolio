"use client";
import styles from "./bootup.module.css";
import { useEffect, useMemo, useState } from "react";

interface BootScreenProps {
  onFinish: () => void;
}

export default function BootScreen({ onFinish }: BootScreenProps) {
  const messages = useMemo(() => [
    "Power check OK",
    "Initializing system core...",
    "CPU detected",
    "Memory scan: OK",
    "Loading system modules...",
    "Checking disk integrity...",
    "Mounting virtual drives...",
    "Verifying configuration tables...",
    "Applying hardware profiles...",
    "Starting background services...",
    "Network interface online",
    "Synchronizing system clock...",
    "Finalizing startup sequence...",
    "System ready"
  ], []);

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    if (lineIndex >= messages.length) {
      const timer = setTimeout(onFinish, 800);
      return () => clearTimeout(timer);
    }

    const currentLine = messages[lineIndex];

    if (charIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setCharIndex(charIndex + 1);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setOutput(prev => [...prev, currentLine]);
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [charIndex, lineIndex, messages, onFinish]);

  return (
    <div className={styles.bootScreen}>
      {output.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      {lineIndex < messages.length && (
        <div>
          {messages[lineIndex].slice(0, charIndex)}
          <span className="cursor">_</span>
        </div>
      )}
    </div>
  );
}

