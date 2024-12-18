import React, { useState, useEffect } from 'react';
import { useTimeout } from './hooks/useTimeout';
import { Timer } from './.Timer';
import { ChatFormData } from './types/chat';

interface WaitingRoomProps {
  ReqQueue: ChatFormData;
  onTimeout: () => void;
}

export function WaitingRoom({ ReqQueue, onTimeout }: WaitingRoomProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((time) => Math.max(0, time - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useTimeout(onTimeout, 30000); // 5 minutes in milliseconds

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-semibold">Waiting Room</h2>
      <p>Waiting for others to join the topic: {ReqQueue.topic}</p>
      <Timer timeLeft={timeLeft} />
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        You'll be returned to the home page if no one joins within {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, '0')}
      </p>
    </div>
  );
}