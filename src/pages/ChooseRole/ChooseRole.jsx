import styles from './ChooseRole.module.scss';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function ChooseRole() {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className={styles.chooseRoleWrap}>
                <h4 className={styles.chooseRoleTitle}>한번 세부 설정을 해볼까요~?</h4>
                <button onClick={() => navigate('/chat')}>설정 완료</button>
            </div>
        </Layout>
    )
}

export default ChooseRole;