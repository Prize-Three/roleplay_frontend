import React, { useEffect, useState } from 'react';
import styles from './TotalResult.module.scss';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function TotalResult() {
    const navigate = useNavigate();
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        const fetchHistoryList = async () => {
            try {
                const response = await fetch('http://localhost:8000/history');
                if (!response.ok) {
                    throw new Error('데이터를 가져오는데 실패했습니다.');
                }
                const data = await response.json();
                setHistoryList(data.history_list);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchHistoryList();
    }, []);

    return (
        <Layout>
            <div className={styles.totalResultContainer}>
                <div className={styles.totalResultHead}>
                    <div>역할놀이 스크립트 관리</div>
                    <button onClick={() => navigate('/')}>나가기 ❎</button>
                </div>

                <div className={styles.totalResultBody}>
                    <div className={styles.headerRow}>
                        <p>놀이 종류</p>
                        <p>날짜</p>
                        <p>진행시간</p>
                        <p>음성</p>
                    </div>
                    {historyList.map((history) => (
                        <div 
                            key={history.history_id} 
                            className={styles.historyItem}
                            onClick={() => navigate('/result')}
                        >
                            <p>{history.situation}</p>
                            <p>{history.date}</p>
                            <p>{history.duration}</p>
                            <p>{history.voice}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default TotalResult;