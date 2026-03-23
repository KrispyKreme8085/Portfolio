'use client';

import { useEffect } from 'react';
import styles from './errorScreen.module.css';

export default function ErrorScreen({
        error,
    }: {
        error: Error & { digest?: string };
    }) {
    useEffect(() => {
    console.error(error);
    }, [error]);

    const errorFace = ':{'

    return (
        <div className={styles.center}>
            <div className={styles.error}>
                <h1>{errorFace}</h1>
                <h2>An Error Has Occured</h2>
                <h2>Error Message: {error.message}</h2> 
                <h3>Press Esc to try again</h3>
            </div>
        </div>
    );
}