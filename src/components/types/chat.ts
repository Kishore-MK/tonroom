
export interface ChatFormData {
  yourRole: string;
  expectedRole: string;
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