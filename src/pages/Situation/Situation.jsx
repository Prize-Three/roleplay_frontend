import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import styles from './Situation.module.scss';

function Situation() {
    const navigate = useNavigate();
    const [selectedGameType, setSelectedGameType] = useState(null);

    const handleRolePlaySelect = (gameType) => {
        setSelectedGameType(gameType);
    };

    const handleNextStep = () => {
        if (selectedGameType) {
            navigate(`/chat/`);
        } else {
            alert('먼저 놀이 유형을 선택해주세요!');
        }
    };

    const handleExit = () => {
        navigate('/'); // Replace with the appropriate path to navigate to the exit page
    };

    return (
        <Layout>
            <div className={styles.situationWrap}>
                <div className={styles.header}>
                    <h1 className={styles.title}>역할놀이</h1>
                    <button onClick={handleExit} className={styles.exitButton}>나가기</button>
                </div>
                <div className={styles.content}>
                    <div className={styles.leftPanel}>
                        <h2 className={styles.subtitle}>놀이를 선택해주세요</h2>
                        <div className={styles.gameTypeBox}>
                            <button onClick={() => handleRolePlaySelect('학교 놀이')} className={styles.gameTypeButton}>학교 놀이</button>
                            <button onClick={() => handleRolePlaySelect('병원 놀이')} className={styles.gameTypeButton}>병원 놀이</button>
                            <button onClick={() => handleRolePlaySelect('시장 놀이')} className={styles.gameTypeButton}>시장 놀이</button>
                            <button onClick={() => handleRolePlaySelect('가족 놀이')} className={styles.gameTypeButton}>가족 놀이</button>
                            <button onClick={() => handleRolePlaySelect('소꿉 놀이')} className={styles.gameTypeButton}>소꿉 놀이</button>
                            <button onClick={() => handleRolePlaySelect('학교 놀이')} className={styles.gameTypeButton}>학교 놀이</button>
                            <button onClick={() => handleRolePlaySelect('병원 놀이')} className={styles.gameTypeButton}>병원 놀이</button>
                            <button onClick={() => handleRolePlaySelect('시장 놀이')} className={styles.gameTypeButton}>시장 놀이</button>
                            <button onClick={() => handleRolePlaySelect('가족 놀이')} className={styles.gameTypeButton}>가족 놀이</button>
                            <button onClick={() => handleRolePlaySelect('소꿉 놀이')} className={styles.gameTypeButton}>소꿉 놀이</button>
                        </div>
                        <button onClick={handleNextStep} className={styles.startButton}>시작하기</button>
                    </div>
                    {selectedGameType && (
                        <div className={styles.rightPanel}>
                            <h3>{selectedGameType}에 대한 세부 설정</h3>
                            <p>음성 설정</p>
                            <p>역할 설정</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Situation;
