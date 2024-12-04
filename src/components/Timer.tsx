import React from 'react';

interface TimerProps {
  timeLeft: number;
}

export function Timer({ timeLeft }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="bg-blue-600 text-white px-3 py-1 rounded-md">
        {minutes.toString().padStart(2, '0')}
      </div>
      <span className="text-xl">:</span>
      <div className="bg-blue-600 text-white px-3 py-1 rounded-md">
        {seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
}