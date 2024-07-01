import React from 'react';
import styles from './TotalResult.module.scss';
import { useNavigate } from 'react-router-dom';

function TotalResult() {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.totalResultContainer}>
                <h1>모든 스크립트 모아둠</h1>
                <p>그동안 진행한 모든 스크립트 확인 가능 페이지</p>
                <button onClick={() => navigate('/')}>메인화면으로 돌아가기</button>
            </div>
        </>
    );
}

export default TotalResult;