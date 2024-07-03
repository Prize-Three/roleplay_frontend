// Home.jsx

import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';

function Home() {
    const navigate = useNavigate();
    let title = 'AI와 함께하는 역할놀이 서비스 - 테스트 페이지';

    return (
        <Layout>
            <div className={styles.homeWrap}>
                <div className={styles.buttonWrap}>
                    <button onClick={() => navigate('/voice-manage')}>음성 관리</button>
                    <button onClick={() => navigate('/total-result')}>스크립트 관리</button>
                </div>
                <div className={styles.homeContentWrap}>
                    <div className={styles.homeDiv}>
                        <h4>{title}</h4>
                        <button className={styles.startBtn} onClick={() => navigate('/situation')}>시작하기</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
