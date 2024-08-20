import React, { useEffect, useState } from 'react';
import styles from './TotalResult.module.scss';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Header1 from '../../components/Header1/Header1'; // 공용 헤더 컴포넌트 임포트

function TotalResult() {
    const navigate = useNavigate();
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        const fetchHistoryList = async () => {
            try {
                const response = await fetch('http://localhost:8000/report/result/analysis?user_id=1');
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
                <Header1 title="결과 분석 레포트" onBack={() => navigate('/home')} />
                <div className={styles.totalResultBody}>
                    <div className={styles.headerRow}>
                        <div>번호</div> {/* Add a header for the sequence number */}
                        <div>놀이 종류</div>
                        <div>날짜</div>
                        <div>진행시간</div>
                        <div>음성</div>
                    </div>
                    <div className={styles.historyItemDiv}>
                        {historyList.map((history, index) => (
                            <div 
                                key={history.history_id} 
                                className={styles.historyItem}
                                onClick={() => navigate(`/result/${history.history_id}`)}
                            >
                                <div>{index + 1}</div> {/* Display the sequential number */}
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