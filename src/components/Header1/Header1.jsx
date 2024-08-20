import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header1.module.scss'; // 스타일 파일 임포트

function Header1({ title, onBack }) {
    return (
        <div className={styles.header}>
            <h1>{title}</h1>
            <div className={styles.headerLine}>- - - - - - - - - - - - - -</div>
            <button onClick={onBack} className={styles.exitButton}>
                <svg className={styles.svgText} viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                    <text 
                        x="50%" 
                        y="50%" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        className={styles.textOutline}
                        strokeLinejoin="round"
                    >
                        이전으로
                    </text>
                    <text 
                        x="50%" 
                        y="50%" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        className={styles.textMain}
                    >
                        이전으로
                    </text>
                </svg>
            </button>
        </div>
    );
}

export default Header1;