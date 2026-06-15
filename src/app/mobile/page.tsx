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
        { name: "Personal Projects", image: "folderclosed" },
        { name: "Resume", image: "file" }
        // { name: "Minesweeper", image: "sweeperFlag" },
    ]

    const [openApp, setOpenApp] = useState<number | null>(null);
    const resumeAppId = apps.findIndex((app) => app.name === "Resume");

    const closePopUp = () => setOpenApp(null);
    const openPopUp = (appId: number) => {
        if (appId === resumeAppId) {
            window.location.href = "/pdfs/karsonmellottresume.pdf";
            return;
        }
        setOpenApp(appId);
    };
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