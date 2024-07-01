import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    let title = 'AI와 함께하는 역할놀이 서비스 테스트 페이지';

    return (
        <>
            <div>
                <button onClick={() => navigate('/voice-manage')}>🔊</button>
                <button onClick={() => navigate('/total-result')}>📝</button>
            </div>
            <div className={styles.homeImg}>
                <img src="/assets/home/homeImg.png" alt="메인 이미지" width="100%"/>
            </div>
            <div className={styles.homeDiv}>
                <h4>{title}</h4>
                <button onClick={() => navigate('/situation')}>시작하기</button>
            </div>
        </>
    )
}

export default Home;