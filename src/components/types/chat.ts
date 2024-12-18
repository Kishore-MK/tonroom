
export interface ChatFormData {
  creatorRole: string;
  participantRole: string;
  topic: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface Topic {
  id: string;
  name: string;
  participants: number;
}

export interface TopicContextType {
  topics: Topic[];
  searchTopic: (query: string) => Topic[];
  addTopic: (topic: string) => void;
  topicExists: (topic: string) => boolean;
}

export interface SearchableOption {
  id: string;
  label: string;
  value: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'self' | 'peer';
  timestamp: Date;
}

export interface PeerConnection {
  id: string | null;
  conn: any | null;
  connected: boolean;
  error: string | null;
}