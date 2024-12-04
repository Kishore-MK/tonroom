import React, { createContext, useContext, useState } from 'react';
import { Topic, TopicContextType } from '../types/chat';

const TopicContext = createContext<TopicContextType | undefined>(undefined);

// Mock initial topics
const initialTopics: Topic[] = [
  { id: '1', name: 'React Hooks', participants: 3 },
  { id: '2', name: 'TypeScript Basics', participants: 2 },
  { id: '3', name: 'Node.js Fundamentals', participants: 5 },
];

export function TopicProvider({ children }: { children: React.ReactNode }) {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);

  const searchTopic = (query: string): Topic[] => {
    const lowercaseQuery = query.toLowerCase();
    return topics.filter(topic => 
      topic.name.toLowerCase().includes(lowercaseQuery)
    );
  };

  const addTopic = (topicName: string) => {
    const newTopic: Topic = {
      id: Date.now().toString(),
      name: topicName,
      participants: 1,
    };
    setTopics([...topics, newTopic]);
  };

  const topicExists = (topicName: string): boolean => {
    return topics.some(topic => 
      topic.name.toLowerCase() === topicName.toLowerCase()
    );
  };

  return (
    <TopicContext.Provider value={{ topics, searchTopic, addTopic, topicExists }}>
      {children}
    </TopicContext.Provider>
  );
}

export const useTopics = () => {
  const context = useContext(TopicContext);
  if (context === undefined) {
    throw new Error('useTopics must be used within a TopicProvider');
  }
  return context;
};