import React from 'react';
import { useChatStore } from './store/useChatStore';

export const MessageList: React.FC = () => {
  const { messages } = useChatStore();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === 'self' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[70%] p-3 rounded-lg ${
              message.sender === 'self'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <p>{message.text}</p>
            <span className="text-xs opacity-75">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};