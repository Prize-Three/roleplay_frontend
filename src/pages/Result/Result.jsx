import React from 'react';
import styles from './Result.module.scss';
import { useNavigate } from 'react-router-dom';

function Result() {
const navigate = useNavigate();

  return (
    <>
        <div className={styles.resultContainer}>
            <h1>결과 페이지</h1>
            <p>여기에 결과 내용을 표시합니다.</p>
            <button onClick={() => navigate('/')}>메인화면으로 돌아가기</button>
        </div>
    </>
  );
}

export default Result;
