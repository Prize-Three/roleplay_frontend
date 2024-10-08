import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import styles from './Chat.module.scss';
import { useLocation } from 'react-router-dom';

function Chat() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedGameType = queryParams.get('selectedGameType');
    const selectedUserRole = queryParams.get('selectedUserRole');
    const selectedAIRole = queryParams.get('selectedAIRole');
    let selectedAIVoice = queryParams.get('selectedAIVoice');
    const historyId = queryParams.get('history_id'); // URL에서 history_id 가져오기

    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUserMessage(e.target.value);
    };

    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        window.speechSynthesis.speak(utterance);
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        const newMessages = [...messages, { sender: '사용자', text: userMessage }];
        setMessages(newMessages);
        setUserMessage('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/server/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: {
                        question: userMessage
                    },
                    chat_history_id: {
                        history_id: historyId // history_id 포함
                    }
                })
            });

            const data = await response.json();
            const computerMessage = { sender: '컴퓨터', text: data.response };
            setMessages([...newMessages, computerMessage]);
            // speakText(computerMessage.text);
            await textToSpeech(computerMessage.text); // TTS API 호출
        } catch (error) {
            console.error('Error:', error);
            setMessages([...newMessages, { sender: '컴퓨터', text: 'Error: 응답을 가져올 수 없습니다.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleStartListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('STT를 지원하지 않는 브라우저입니다.');
            return;
        }

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'ko-KR';
        recognition.interimResults = false;
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setUserMessage(transcript);
            handleSendMessage();
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
        setIsListening(true);
    };

    const handleStopClick = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleConfirmExit = async () => {
        // 서버로 history_id를 JSON 형태로 전송
        try {
            await fetch('http://localhost:8000/report/chat/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    history_id: historyId
                })
            });
        } catch (error) {
            console.error('Error sending history_id:', error);
        }

        navigate('/');
    };

    const voiceOptions = ['미고미', '보고미', '정고미', '유고미'];
    const voiceMapping = {
        '미고미': 'ko-KR-Wavenet-A',
        '보고미': 'ko-KR-Wavenet-A',
        '정고미': 'ko-KR-Wavenet-C',
        '유고미': 'ko-KR-Wavenet-A'
    };

    // URL에서 voice_id를 가져와서 음성 이름으로 변환
    const voiceId = parseInt(queryParams.get('voice_id'), 10);
    selectedAIVoice = voiceOptions[voiceId - 1]; // 인덱스는 0부터 시작하므로 1을 뺌
    console.log('Selected AI Voice:', selectedAIVoice);

    const textToSpeech = async (text) => {
        const apiKey = process.env.REACT_APP_GOOGLE_TTS_API_KEY; // 환경 변수에서 API 키 가져오기
        const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
        const voiceName = voiceMapping[selectedAIVoice] || 'ko-KR-Wavenet-A'; // 기본값 설정


        const data = {
            input: { text },
            voice: {
                languageCode: 'ko-KR',
                name: voiceName,
                ssmlGender: 'NEUTRAL',
            },
            audioConfig: {
                audioEncoding: "MP3",
            },
        };
    
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
            if (result.audioContent) {
                const audio = new Audio(`data:audio/mp3;base64,${result.audioContent}`);
                audio.play();
            } else {
                console.error('Error: No audio content received');
            }
        } catch (error) {
            console.error('Error during TTS:', error);
        }
    };

    return (
        <Layout>
            <div className={styles.chatContainer}>
                <div className={styles.chatWrapper}>
                    <div className={styles.chatHeader}>
                        <h1>역할놀이 챗봇</h1>
                        <button className={styles.stopButton} onClick={handleStopClick}>
                            그만할래
                        </button>
                    </div>
                    <div className={styles.chatBody}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`${styles.message} ${msg.sender === '사용자' ? styles.userMessage : styles.computerMessage}`}>
                                <strong>{msg.sender}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className={styles.userInput}>
                        <input
                            type="text"
                            id="user-message"
                            value={userMessage}
                            onChange={handleInputChange}
                            placeholder="메시지를 입력하세요..."
                            className={styles.userMessageInput}
                        />
                        <button className={styles.sendButton} onClick={handleSendMessage}>
                            전송
                        </button>
                        <button className={styles.sendButton} onClick={handleStartListening} disabled={isListening}>
                            {isListening ? '음성 인식 중...' : '음성 입력'}
                        </button>
                    </div>
                    {loading && <div className={styles.loading}>응답 생성 중...</div>}
                </div>
                {showAlert && (
                    <Alert
                        message="정말로 종료하시겠습니까?"
                        onConfirm={handleConfirmExit}
                        onCancel={handleCloseAlert}
                    />
                )}
            </div>
        </Layout>
    );
}

export default Chat;