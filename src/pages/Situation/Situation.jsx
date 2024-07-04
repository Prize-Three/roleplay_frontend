import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import styles from './Situation.module.scss';

function Situation() {
    const navigate = useNavigate();
    const [selectedGameType, setSelectedGameType] = useState(null);
    const [selectedUserRole, setSelectedUserRole] = useState(null);
    const [selectedAIRole, setSelectedAIRole] = useState(null);
    const [selectedAIVoice, setSelectedAIVoice] = useState(null);
    const [rightPanelState, setRightPanelState] = useState(false);

    const handleRolePlaySelect = (gameType) => {
        if (gameType === selectedGameType) {
            setSelectedGameType(null); // 이미 선택된 게임 타입을 다시 클릭하면 선택 취소
            setRightPanelState(false); // rightPanel 숨기기
        } else {
            setSelectedGameType(gameType); // 새로운 게임 타입 선택
            setRightPanelState(true); // rightPanel 보이기
        }
    };

    const handleNextStep = () => {
        if (selectedGameType && selectedUserRole && selectedAIRole && selectedAIVoice) {
            navigate(`/chat/`);
        } else {
            alert('모든 역할과 음성을 선택해주세요!');
        }
    };

    const handleExit = () => {
        navigate('/'); // Replace with the appropriate path to navigate to the exit page
    };

    return (
        <Layout>
            <div className={styles.situationWrap}>
                <div className={styles.header}>
                    <h1 className={styles.title}>역할놀이 🐻</h1>
                    <button onClick={handleExit} className={styles.exitButton}>돌아가기</button>
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
                    </div>
                    {rightPanelState && selectedGameType && (
                        <div className={styles.rightPanel}>
                            <div className={styles.rightPanelHeader}>
                                <h3>세부 설정</h3>
                                <p>선택된 놀이: {selectedGameType}</p>
                            </div>
                            <div className={styles.selectionSection}>
                                <h3>사용자 역할</h3>
                                <select onChange={(e) => setSelectedUserRole(e.target.value)} className={styles.selectDropdown}>
                                    <option value="">선택해주세요</option>
                                    <option value="역할A">역할A</option>
                                    <option value="역할B">역할B</option>
                                    <option value="역할C">역할C</option>
                                    <option value="역할D">역할D</option>
                                </select>
                            </div>
                            <div className={styles.selectionSection}>
                                <h3>AI의 역할</h3>
                                <select onChange={(e) => setSelectedAIRole(e.target.value)} className={styles.selectDropdown}>
                                    <option value="">선택해주세요</option>
                                    <option value="역할A">역할A</option>
                                    <option value="역할B">역할B</option>
                                    <option value="역할C">역할C</option>
                                    <option value="역할D">역할D</option>
                                </select>
                            </div>
                            <div className={styles.selectionSection}>
                                <h3>AI의 음성</h3>
                                <select onChange={(e) => setSelectedAIVoice(e.target.value)} className={styles.selectDropdown}>
                                    <option value="">선택해주세요</option>
                                    <option value="음성A">음성A</option>
                                    <option value="음성B">음성B</option>
                                    <option value="음성C">음성C</option>
                                    <option value="음성D">음성D</option>
                                </select>
                            </div>
                            <button onClick={handleNextStep} className={styles.startButton}>시작하기</button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Situation;
