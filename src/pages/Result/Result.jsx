import React from 'react';
import styles from './Result.module.scss';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function Result() {
const navigate = useNavigate();

  return (
    <Layout>
        <div className={styles.resultContainer}>
          <div className={styles.whiteBox}>
            <h1>놀이 결과</h1>
            <p>놀이 결과를 보여줍니다(미정).</p>
            <button onClick={() => navigate('/')}>메인화면으로 돌아가기</button>
          </div>
        </div>
    </Layout>
  );
}

export default Result;
