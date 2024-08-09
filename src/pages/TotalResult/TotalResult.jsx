import React from 'react';
import styles from './TotalResult.module.scss';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function TotalResult() {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className={styles.totalResultContainer}>
                <div className={styles.totalResultHead}>
                    <div>역할놀이 스크립트 관리</div>
                    <button onClick={() => navigate('/')}>나가기 ❎</button>
                </div>

                <div className={styles.totalResultBody}>
                    <h1>스크립트 모음</h1>
                    <p>그동안 진행한 모든 스크립트 확인 가능 페이지</p>
                    
                </div>
            </div>
        </Layout>
    );
}

export default TotalResult;