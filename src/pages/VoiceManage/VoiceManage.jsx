import React from 'react';
import styles from './VoiceManage.module.scss';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Header1 from '../../components/Header1/Header1'; // 공용 헤더 컴포넌트 임포트

// Function to render SVG text
const renderButtonContent = (text, outlineClass) => (
    <svg className={styles.svgText} viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
        <text 
            x="50%" 
            y="50%" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className={outlineClass}
            strokeLinejoin="round"
        >
            {text}
        </text>
        <text 
            x="50%" 
            y="50%" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className={styles.textMain}
        >
            {text}
        </text>
    </svg>
);

function VoiceManage() {
    const navigate = useNavigate();

    const characters = [
        {
            name: '미고미',
            image: '/assets/common/m_agomi.png',
            features: ['#포기는없다', '#잘먹음'],
            voice: 'ko-KR-Wavenet-A',
            text: '안녕 반가워. 나는 미고미야. 나는 뭐든지 주어진 기회에 대해 최선을 다하려고 해! 나는 지금 대학생이고, 아고미 친구들과 학교에서 열리는 밸류업 대회를 준비하고 있어. 꼭 상을 받고 싶어 히히. 난 맛있는거 먹는 걸 좋아해. 내가 가장 좋아하는 음식은 떡볶이야. 공부할때 스트레스 받으면 떡볶이가 땡겨. 나랑 친구하지 않을래? 만나서 반가워.'
        },
        {
            name: '보고미',
            image: '/assets/common/b_agomi.png',
            features: ['#해피바이러스', '#사교적'],
            voice: 'ko-KR-Wavenet-A',
            text: '하하하하 얘들아 너무 반가워. 나는 해피 바이러스 보고미야. 나는 친구들의 말에 잘 웃어주고, 잘 반응해줘서 주변 친구들이 나랑 대화하기를 좋아하는 것 같아. 나는 그래서 항상 주변 사람들하고 두루두루 잘 지내는 것 같아. 너도 해피바이러스인 나와 함께라면, 금방 친해질 수 있을거야. 나랑 친구하지 않을래? 난 너랑 정말 친해지고 싶어.'
        },
        {
            name: '정고미',
            image: '/assets/common/j_agomi.png',
            features: ['#예술적', '#콘서트좋아'],
            voice: 'ko-KR-Wavenet-C',
            text: '안녕 나는 정고미라고 해. 나는 옛날부터 기획이나 디자인을 잘한다는 소리를 주변에서 많이 들었어. 내가 봐도 쫌 잘하는 것 같아 훗! 칭찬을 들을수록 더 열심히 하고 싶어지는 것 같아. 나는 콘서트에 가는 걸 정말 좋아해. 좋아하는 가수의 노래를 현장에서 들으면 정말 좋더라구. 얼른 너랑 친해져서 콘서트도 함께 가고 싶어. 같이 가지 않을래?'
        },
        {
            name: '유고미',
            image: '/assets/common/y_agomi.png',
            features: ['#운동좋아', '#AI러버'],
            voice: 'ko-KR-Wavenet-A',
            text: '방가방가 나는 유고미야. 나는 운동을 좋아해. 자기관리를 하는 건 정말 꼭 필요하다고 생각하고, 운동을 함으로써 기분이 리프레쉬되기 때문이야. 그래서 대학교 생활동안, 1교시 시작 전에 운동을 다녀오고 그랬다니깐 킄킄. 나는 요새 AI공부를 하고 있어. 정말 흥미로운 분야같아. 나랑 같이 공부할사람 있어? 서로 모르는거 알려주자. 어때?'
        }
    ];

    const playVoice = async (voice, text) => {
        const apiKey = process.env.REACT_APP_GOOGLE_TTS_API_KEY; // 환경 변수에서 API 키 가져오기
        const audioUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`; // Replace with your API key
        const response = await fetch(audioUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: { text: text },
                voice: { languageCode: voice, name: voice },
                audioConfig: { audioEncoding: 'MP3' },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
            audio.play();
        } else {
            console.error('Error fetching audio:', response.statusText);
        }
    };

    return (
        <Layout>
            <div className={styles.voiceManageContainer}>
                <Header1 title="아고미 월드" onBack={() => navigate('/home')} />
                <div className={styles.characterRow}>
                    {characters.map((character, index) => (
                        <div key={index} className={styles.characterCard}>
                            <img src={character.image} alt={character.name} className={styles.characterImage} />
                            {renderButtonContent(character.name, styles.textOutline)}
                            <div className={styles.features}>
                                {character.features.join(' ')}
                                <button onClick={() => playVoice(character.voice, character.text)} className={styles.voiceButton}>
                                    소개 듣기
                                    <img src="/assets/voice/voiceStartImg.svg" alt="Play" className={styles.playIcon} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default VoiceManage;