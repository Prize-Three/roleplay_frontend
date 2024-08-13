import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Alert from '../../components/Alert/Alert';
import styles from './Situation.module.scss';

function Situation() {
    const navigate = useNavigate();
    const [selectedGameType, setSelectedGameType] = useState(null);
    const [selectedUserRole, setSelectedUserRole] = useState(null);
    const [selectedAIRole, setSelectedAIRole] = useState(null);
    const [selectedAIVoice, setSelectedAIVoice] = useState(null);
    const [rightPanelState, setRightPanelState] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const roleOptions = {
        '학교 놀이': ['선생님', '학생', '교장선생님'],
        '병원 놀이': ['의사', '환자', '간호사'],
        '시장 놀이': ['상인', '소비자', '경찰'],
        '가족 놀이': ['아빠', '엄마', '아들', '딸'],
        '소꿉 놀이': ['너구리', '사자', '토끼'],
        '소방관 놀이': ['소방관', '도움이 필요한 사람'],
        '연예인 놀이': ['가수', '배우', '메이크업 담당 선생님', '헤어 담당 선생님', '매니저'],
        '승무원 놀이': ['승객', '승무원'],
    };

    const voiceOptions = ['여자 어린이 아고미', '남자 어린이 아고미', '여자 아고미', '남자 아고미'];

    const handleRolePlaySelect = (gameType) => {
        if (gameType === selectedGameType) {
            setSelectedGameType(null);
            setRightPanelState(false);
        } else {
            setSelectedGameType(gameType);
            setRightPanelState(true);
        }
    };

    const handleRoleSelection = (role, type) => {
        if (type === 'user') {
            setSelectedUserRole(role);
        } else if (type === 'ai') {
            setSelectedAIRole(role);
        }
    };

    const handleNextStep = async () => {
        if (selectedGameType && selectedUserRole && selectedAIRole && selectedAIVoice) {
            const voiceIndex = voiceOptions.indexOf(selectedAIVoice) + 1; // 인덱스는 1부터 시작
            const dataToSend = {
                voice_id: voiceIndex,
                situation: selectedGameType,
                my_role: selectedUserRole,
                ai_role: selectedAIRole,
                user_id: 1,
            };

            try {
                const response = await fetch('http://localhost:8000/server/roleplay', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });

                if (!response.ok) {
                    throw new Error('서버로 데이터를 전송하는 데 실패했습니다.');
                }

                const responseData = await response.json();

                // 응답에서 history_id를 받아와 URL에 추가
                const queryParams = new URLSearchParams({
                    ...dataToSend,
                    history_id: responseData.history_id
                }).toString();

                navigate(`/chat?${queryParams}`);
            } catch (error) {
                console.error('Error sending data:', error);
                // 필요에 따라 사용자에게 오류 메시지를 표시할 수 있습니다.
            }
        } else {
            setShowAlert(true);
        }
    };

    const handleExit = () => {
        navigate('/');
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <Layout>
            <div className={styles.situationWrap}>
                <div className={styles.header}>
                    <h1 className={styles.title}> AI와 함께하는 역할놀이 🐻</h1>
                    <button onClick={handleExit} className={styles.exitButton}>돌아가기</button>
                </div>
                <div className={styles.content}>
                    <div className={styles.leftPanel}>
                        <h2 className={styles.subtitle}>놀이를 선택해주세요</h2>
                        <div className={styles.gameTypeBox}>
                            {Object.keys(roleOptions).map((gameType) => (
                                <button
                                    key={gameType}
                                    onClick={() => handleRolePlaySelect(gameType)}
                                    className={`${styles.gameTypeButton} ${gameType === selectedGameType ? styles.selected : ''}`}
                                >
                                    {gameType}
                                </button>
                            ))}
                        </div>
                    </div>
                    {rightPanelState && selectedGameType && (
                        <div className={styles.rightPanel}>
                            <div className={styles.selectionSection}>
                                <h3>
                                    사용자 역할
                                </h3>
                                <div className={styles.roleButtonGroup}>
                                    {roleOptions[selectedGameType].map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => handleRoleSelection(role, 'user')}
                                            className={`${styles.roleButton} ${role === selectedUserRole ? styles.selected : ''}`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.selectionSection}>
                                <h3>AI 역할</h3>
                                <div className={styles.roleButtonGroup}>
                                    {roleOptions[selectedGameType].map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => handleRoleSelection(role, 'ai')}
                                            className={`${styles.roleButton} ${role === selectedAIRole ? styles.selected : ''}`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.selectionSection}>
                                <h3>AI 음성</h3>
                                <div className={styles.voiceButtonGroup}>
                                    {voiceOptions.map((voice) => (
                                        <button
                                            key={voice}
                                            onClick={() => setSelectedAIVoice(voice)}
                                            className={`${styles.voiceButton} ${voice === selectedAIVoice ? styles.selected : ''}`}
                                        >
                                            {voice}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.nextButtonContainer}>
                                <button onClick={handleNextStep} className={styles.nextButton}>다음 단계 ➪</button>
                            </div>
                        </div>
                    )}
                </div>
                {showAlert && (
                    <Alert
                        message="모든 항목을 선택해야 합니다."
                        onConfirm={handleCloseAlert}
                    />
                )}
            </div>
        </Layout>
    );
}

export default Situation;