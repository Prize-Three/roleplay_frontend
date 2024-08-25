import React from 'react';
import styles from './ResultTabTitle.module.scss';

function ResultTabTitle({ title, subTitle, number }) {
    return (
        <div className={styles.titleContainer}>
            <div className={styles.numberBox}>
                <span className={styles.number}>{number}</span>
            </div>
            <div className={styles.titleTextContainer}>
                <h2 className={styles.subtitle}>{title}</h2>
                <div className={styles.title}>{subTitle}</div>
            </div>
        </div>
    );
}

export default ResultTabTitle;