import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';

function Home() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    let title = 'AI와 함께하는 역할놀이';

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Layout>
            <div className={styles.homeWrap}>
                <div className={styles.hamburgerMenu} onClick={toggleMenu}>
                    ☰
                </div>
                {menuOpen && (
                    <div className={styles.menu}>
                        <button onClick={() => navigate('/voice-manage')}>🧸 캐릭터 소개 (음성 소개)</button>
                        <button onClick={() => navigate('/total-result')}>📝 결과 모음</button>
                    </div>
                )}
                <div className={styles.homeContentWrap}>
                    <div className={styles.homeDiv}>
                        <button className={styles.startBtn} onClick={() => navigate('/situation')}>시작하기</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;