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
            // navigate(`/choose-role/${selectedGameType}`);
            navigate(`/chat/`);
        } else {
            alert('먼저 놀이 유형을 선택해주세요!');
        }
    };

    return (
        <Layout>
            <div className={styles.situationWrap}>
                <div className={styles.wrapper}>
                    <div className={styles.gameTypeBox}>
                        <button onClick={() => handleRolePlaySelect('hospital')} className={styles.gameTypeButton}>병원놀이</button>
                        <button onClick={() => handleRolePlaySelect('cooking')} className={styles.gameTypeButton}>요리놀이</button>
                        <button onClick={() => handleRolePlaySelect('family')} className={styles.gameTypeButton}>가족놀이</button>
                        <button onClick={() => handleRolePlaySelect('market')} className={styles.gameTypeButton}>시장놀이</button>
                    </div>
                    {selectedGameType && (
                        <div className={styles.detailPanel}>
                            <h3>{selectedGameType}에 대한 세부 설정</h3>
                            <p>음성 설정</p>
                            <p>역할 설정</p>
                            <button onClick={handleNextStep} className={styles.nextButton}>다음</button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Situation;
