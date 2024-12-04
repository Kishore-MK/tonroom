import React, { useState } from 'react';
import { useChatStore } from './store/useChatStore';
import { initializePeerConnection } from '../utils/peerConnection';

export const ConnectionPanel: React.FC = () => {
  const [peerId, setPeerId] = useState('');
  const { peerConnection } = useChatStore();

  const handleConnect = () => {
    if (peerId.trim()) {
      initializePeerConnection(peerId);
    }
  };

  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={peerId}
          onChange={(e) => setPeerId(e.target.value)}
          placeholder="Enter peer ID"
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={handleConnect}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Connect
        </button>
      </div>
      {peerConnection.id && (
        <p className="mt-2 text-sm text-gray-600">
          Your ID: {peerConnection.id}
        </p>
      )}
      {peerConnection.error && (
        <p className="mt-2 text-sm text-red-500">{peerConnection.error}</p>
      )}
    </div>
  );
};