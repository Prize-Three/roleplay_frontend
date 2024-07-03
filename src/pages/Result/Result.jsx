import React from 'react';
import styles from './Result.module.scss';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function Result() {
const navigate = useNavigate();

  return (
    <Layout>
        <div className={styles.resultContainer}>
            <h1>결과 페이지</h1>
            <p>여기에 결과 내용을 표시합니다.</p>
            <button onClick={() => navigate('/')}>메인화면으로 돌아가기</button>
        </div>
    </Layout>
  );
}

export default Result;
