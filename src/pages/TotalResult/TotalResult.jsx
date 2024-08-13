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
                const response = await fetch('http://localhost:8000/report/roleplay/chat/analysis?user_id=1');
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
                    <div className={styles.totalResultHeadTitle}>📝 결과 모음</div>
                    <button onClick={() => navigate('/')}>이전으로</button>
                </div>

                <div className={styles.totalResultBody}>
                    <div className={styles.headerRow}>
                        <div>놀이 종류</div>
                        <div>날짜</div>
                        <div>진행시간</div>
                        <div>음성</div>
                    </div>
                    <div className={styles.historyItemDiv}>
                        {historyList.map((history) => (
                            <div 
                                key={history.history_id} 
                                className={styles.historyItem}
                                onClick={() => navigate(`/result/${history.history_id}`)}
                            >
                                <div>{history.situation}</div>
                                <div>{history.date}</div>
                                <div>{history.duration}</div>
                                <div>{history.voice}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default TotalResult;