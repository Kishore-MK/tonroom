import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useChatStore } from './store/useChatStore';

export const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { peerConnection, addMessage } = useChatStore();

  const sendMessage = () => {
    if (!message.trim() || !peerConnection.conn) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'self' as const,
      timestamp: new Date(),
    };

    peerConnection.conn.send(message);
    addMessage(newMessage);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={sendMessage}
        className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        <PaperAirplaneIcon className="w-5 h-5" />
      </button>
    </div>
  );
};