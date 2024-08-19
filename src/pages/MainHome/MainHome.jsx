import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import styles from './MainHome.module.scss';

function Home() {
    const navigate = useNavigate();
    let title = 'AI와 함께하는 역할놀이';

    return (
        <Layout>
            <div className={styles.mainHomeWrap}>
                <div className={styles.btnWrap}>
                    <button className={styles.startBtn} onClick={() => navigate('/home')}>시작하기</button>
                </div>
            </div>
        </Layout>
    );
}

export default Home;