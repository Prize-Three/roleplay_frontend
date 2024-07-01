import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Chat.module.scss';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
    navigate('/result');
  };

  return (
    <div className={styles.chatContainer}>
      <h1>역할놀이 챗봇</h1>
      <button className={styles.stopButton} onClick={handleStopClick}>그만하기</button>
      <div id="chat" className={styles.chat}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div id="user-input" className={styles.userInput}>
        <input
          type="text"
          id="user-message"
          value={userMessage}
          onChange={handleInputChange}
          placeholder="말씀하세요..."
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
      {loading && <div id="loading">로딩 중...</div>}
    </div>
  );
}

export default Chat;
