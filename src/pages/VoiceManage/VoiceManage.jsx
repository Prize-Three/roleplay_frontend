import React from 'react';
import styles from './VoiceManage.module.scss';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function VoiceManage() {
    const navigate = useNavigate();

    const characters = [
        {
            name: '미고미',
            image: '/assets/common/m_agomi.png',
            features: ['겨울을 좋아함', '집이 최고']
        },
        {
            name: '보고미',
            image: '/assets/common/b_agomi.png',
            features: ['사교적', '해피해피😝']
        },
        {
            name: '정고미',
            image: '/assets/common/j_agomi.png',
            features: ['예술적', '아이유❤️']
        },
        {
            name: '유고미',
            image: '/assets/common/y_agomi.png',
            features: ['운동 좋아!', 'AI 러버']
        }
    ];

    return (
        <Layout>
            <div className={styles.voiceManageContainer}>
                <div className={styles.header}>
                    <h1>🧸 아고미 월드 캐릭터 소개</h1>
                    <button onClick={() => navigate('/')} className={styles.exitButton}>이전으로</button>
                </div>
                <div className={styles.characterRow}>
                    {characters.map((character, index) => (
                        <div key={index} className={styles.characterCard}>
                            <img src={character.image} alt={character.name} className={styles.characterImage} />
                            <h2>{character.name}</h2>
                            <div className={styles.features}>
                                {character.features.map((feature, i) => (
                                    <span key={i} className={styles.feature}>{feature}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default VoiceManage;