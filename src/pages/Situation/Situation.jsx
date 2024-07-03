import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Situation.module.scss'
import Layout from '../../components/Layout/Layout';

function Situation() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/choose-role');
    };

    return (
        <Layout>
            <div className={styles.situationWrap}>
                <button onClick={handleButtonClick}>병원놀이</button>
                <button onClick={handleButtonClick}>요리놀이</button>
                <button onClick={handleButtonClick}>가족놀이</button>
                <button onClick={handleButtonClick}>시장놀이</button>
            </div>
        </Layout>
    )
}

export default Situation;