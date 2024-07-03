import React from 'react';
import styles from './VoiceManage.module.scss';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function VoiceManage() {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className={styles.voiceManageContainer}>
                <h1>음성 관리</h1>
                <p>음성 학습 및 관리, 선택</p>
                <button onClick={() => navigate('/')}>메인화면으로 돌아가기</button>
            </div>
        </Layout>
    );
}

export default VoiceManage;