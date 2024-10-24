import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false); // Control whether chat is open

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Toggle chat window visibility
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const newMessages = [...messages, { role: 'User', content: userMessage }];
    setMessages(newMessages);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    if (data.response) {
      setMessages([...newMessages, { role: 'AI', content: data.response }]);
    }

    setUserMessage(''); // Clear input
  };

  return (
    <div className="chat-container">
      {/* Chat toggle button */}
      <button className="chat-toggle-button" onClick={toggleChat}>
        Chat
      </button>

      {/* Chat window */}
      {isChatOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h2>Chatbot</h2>
            <button onClick={toggleChat} className="close-chat">X</button> {/* Close button */}
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role.toLowerCase()}`}>
                <strong>{msg.role}:</strong> {msg.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button type="submit" className="chat-send-button">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
