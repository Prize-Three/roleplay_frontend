import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import Header1 from '../../components/Header1/Header1'; // 공용 헤더 컴포넌트 임포트

function Home() {
    const navigate = useNavigate();
    const renderButtonContent = (text, outlineClass) => (
        <svg className={styles.svgText} viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className={outlineClass}
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
            <div className={styles.homeContainerWrap}>
                <Header1 title="사용자 메뉴" onBack={() => navigate('/')} /> 
                <div className={styles.contentWrap}>
                    <div className={styles.buttonContainer}>
                        <div className={styles.leftColumn}>
                            <button className={styles.startBtn} onClick={() => navigate('/situation')}>
                                {renderButtonContent('역할놀이 하러가기', styles.startTextOutline)}
                            </button>
                        </div>
                        <div className={styles.rightColumn}>
                            <button className={styles.menuBtn} onClick={() => navigate('/voice-manage')}>
                                {renderButtonContent('캐릭터 및 음성 소개', styles.menuTextOutline)}
                            </button>
                            <button className={styles.menuBtn} onClick={() => navigate('/total-result')}>
                                {renderButtonContent('결과 분석 레포트', styles.menuTextOutline)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;