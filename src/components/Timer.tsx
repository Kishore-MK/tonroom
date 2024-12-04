import React, { useEffect, useState } from 'react';
import { useChatStore } from './store/useChatStore';
import { formatTime } from '../utils/timeUtils';

export const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds
  const { peerConnection, setPeerConnection } = useChatStore();

  useEffect(() => {
    if (!peerConnection.connected) {
      setTimeLeft(2 * 60 * 60);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (peerConnection.conn) {
            peerConnection.conn.close();
          }
          setPeerConnection({ connected: false, conn: null });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [peerConnection.connected, setPeerConnection]);

  if (!peerConnection.connected) {
    return null;
  }

  return (
    <div className="text-center py-2 bg-gray-50 border-b">
      <span className="text-sm font-medium text-gray-600">
        Connection closes in: {formatTime(timeLeft)}
      </span>
    </div>
  );
};