import React, { useState, useEffect } from 'react';
import { useTimeout } from './hooks/useTimeout';
import { Timer } from './.Timer';

interface WaitingRoomProps {
  topic: string;
  onTimeout: () => void;
}

export function WaitingRoom({ topic, onTimeout }: WaitingRoomProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((time) => Math.max(0, time - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useTimeout(onTimeout, 300000); // 5 minutes in milliseconds

  return (
    <div className="text-center space-y-4 dark:text-white">
      <h2 className="text-2xl font-semibold">Waiting Room</h2>
      <p>Waiting for others to join the topic: {topic}</p>
      <Timer timeLeft={timeLeft} />
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        You'll be returned to the form if no one joins within {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, '0')}
      </p>
    </div>
  );
}