import { create } from 'zustand';
import { Message, PeerConnection } from '../types/chat';

interface ChatStore {
  messages: Message[];
  peerConnection: PeerConnection;
  addMessage: (message: Message) => void;
  setPeerConnection: (connection: Partial<PeerConnection>) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  peerConnection: {
    id: null,
    conn: null,
    connected: false,
    error: null,
  },
  addMessage: (message) =>
    set((state) => ({
      messages: [message, ...state.messages],
    })),
  setPeerConnection: (connection) =>
    set((state) => ({
      peerConnection: { ...state.peerConnection, ...connection },
    })),
  clearMessages: () => set({ messages: [] }),
}));