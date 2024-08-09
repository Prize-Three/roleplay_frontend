
import styles from './TotalResult.module.scss';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useEffect, useState, React } from 'react';

function TotalResult() {
    const navigate = useNavigate();

    // 비동기로 데이터 가져오기
    const [historyList, setHistoryList] = useState([]);

    useEffect(()=>{
        // 데이터를 가져오는 비동기 함수
        const fetchHistoryList = async () => {
            try {
                const response = await fetch('http://localhost:8000/history');

                if (!response.ok) {
                    throw new Error('데이터를 가져오는데 실패했습니다.')
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
                    <div>
                        {historyList.map((history) => (
                            <div 
                                key={history.history_id} 
                                className={styles.historyItem}
                                onClick={() => navigate('/result')}
                                style={{ cursor: 'pointer' }} // 커서 변경
                            >
                                <p>{history.situation}</p>
                                <p>|</p>
                                <p>{history.date}</p>
                                <p>|</p>
                                <p>{history.duration}</p>
                                <p>|</p>
                                <p>{history.voice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default TotalResult;