import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import styles from './Chat.module.scss';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUserMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        const newMessages = [...messages, { sender: '사용자', text: userMessage }];
        setMessages(newMessages);
        setUserMessage('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            setMessages([...newMessages, { sender: '컴퓨터', text: data.response }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages([...newMessages, { sender: '컴퓨터', text: 'Error: 응답을 가져올 수 없습니다.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleStopClick = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleConfirmExit = () => {
        navigate('/result');
    };

    return (
        <Layout>
            <div className={styles.chatContainer}>
                <div className={styles.chatWrapper}>
                    <div className={styles.chatHeader}>
                        <h1>역할놀이 챗봇</h1>
                        <button className={styles.stopButton} onClick={handleStopClick}>
                            X
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
                    </div>
                </div>
                {showAlert && (
                    <Alert
                        message="정말 종료하시겠습니까?"
                        onConfirm={handleConfirmExit}
                        onCancel={handleCloseAlert}
                    />
                )}
            </div>
        </Layout>
    );
}

export default Chat;
