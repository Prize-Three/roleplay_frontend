import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Result.module.scss';
import Layout from '../../components/Layout/Layout';

function Result() {
    const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 생성
    const { historyId } = useParams();

    return (
        <Layout>
            <div className={styles.resultContainer}>
                <div className={styles.whiteBox}>
                    <h1>놀이 결과</h1>
                    <p>선택한 기록 ID: {historyId}</p>
                    <button onClick={() => navigate('/')}>메인화면으로 돌아가기</button>
                </div>
            </div>
        </Layout>
    );
}

export default Result;