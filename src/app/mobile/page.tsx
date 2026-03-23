"use client";

import styles from './page.module.css';
import StatusBar from './Components/StatusBar/statusBar';
import App from './Components/App/app';
import { useState, useEffect } from 'react';
import { div } from 'framer-motion/client';

export default function Home() {

    const apps = [
        { name: "About Me", image: "aboutme" },
        { name: "Contact Info", image: "contactme" },
        { name: "Client Projects", image: "folderclosed" },
        { name: "Other  Projects", image: "folderclosed" },
        // { name: "Minesweeper", image: "sweeperFlag" },
    ]

    const [openApp, setOpenApp] = useState<number | null>(null);

    const closePopUp = () => setOpenApp(null);
    const openPopUp = (index: number) => setOpenApp(index);

    return (
        <div className={styles.page}>
            <StatusBar></StatusBar>
            <div className={styles.appsContainer}>
                {apps.map((app, index) => (
                    <div key={index} style={{ zIndex: openApp === index ? 1000 : 1 }}>
                        <App 
                            name={app.name} 
                            image={app.image} 
                            onOpen={() => openPopUp(index)} 
                            onClose={closePopUp}
                            isOpen={openApp === index}
                        />
                    </div>
                    
                ))}
            </div>
        </div>
    );
}