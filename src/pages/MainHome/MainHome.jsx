import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import styles from './MainHome.module.scss';

function Home() {
    const navigate = useNavigate();

    const renderButtonContent = (text) => (
        <svg className={styles.svgText} viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className={styles.textOutline}
                strokeLinejoin="round"
            >
                {text}
            </text>
            <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className={styles.textMain}
            >
                {text}
            </text>
        </svg>
    );

    return (
        <Layout>
            <div className={styles.mainHomeWrap}>
                <div className={styles.btnWrap}>
                    <button className={styles.startBtn} onClick={() => navigate('/home')}>
                        {renderButtonContent('시작하기')}
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Home;