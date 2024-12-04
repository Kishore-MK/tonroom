import Peer from 'peerjs';
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';

export const initializePeerConnection = (targetPeerId?: string) => {
  const { setPeerConnection, addMessage } = useChatStore.getState();

  const peer = new Peer();

  peer.on('open', (id) => {
    setPeerConnection({ id });

    if (targetPeerId) {
      const conn = peer.connect(targetPeerId);
      setupConnection(conn);
    }
  });

  peer.on('connection', (conn) => {
    setupConnection(conn);
  });

  peer.on('error', (err) => {
    setPeerConnection({ error: err.message });
    toast.error(err.message);
  });
};

const setupConnection = (conn: any) => {
  const { setPeerConnection, addMessage } = useChatStore.getState();

  conn.on('open', () => {
    setPeerConnection({ conn, connected: true, error: null });
    toast.success('Connected successfully!');
  });

  conn.on('data', (data: string) => {
    addMessage({
      id: Date.now().toString(),
      text: data,
      sender: 'peer',
      timestamp: new Date(),
    });
  });

  conn.on('close', () => {
    setPeerConnection({ connected: false, conn: null });
    toast.error('Connection closed');
  });
};