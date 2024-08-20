import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';

function Home() {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className={styles.homeContainerWrap}>
                <div className={styles.header}>
                    <h1>사용자 메뉴</h1>
                    <button onClick={() => navigate('/')} className={styles.exitButton}>이전으로</button>
                </div>
                <div className={styles.contentWrap}>
                    <div className={styles.buttonContainer}>
                        <div className={styles.leftColumn}>
                            <button className={styles.startBtn} onClick={() => navigate('/situation')}>
                                <span className={styles.textOutline}>역할놀이 하러가기</span>
                                <span className={styles.textMain}>역할놀이 하러가기</span>
                            </button>
                        </div>
                        <div className={styles.rightColumn}>
                            <button className={styles.menuButton} onClick={() => navigate('/voice-manage')}>
                                <span className={styles.textOutline}>캐릭터 소개 (음성 소개)</span>
                                <span className={styles.textMain}>캐릭터 소개 (음성 소개)</span>
                            </button>
                            <button className={styles.menuButton} onClick={() => navigate('/total-result')}>
                                <span className={styles.textOutline}>결과 모음</span>
                                <span className={styles.textMain}>결과 모음</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
