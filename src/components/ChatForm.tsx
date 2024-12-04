import React, { useState } from 'react';
import { ChatFormData } from './types/chat';
import { TopicSearch } from './TopicSearch';
import { SearchableSelect } from './SearchableSelect';
import { useTopics } from './context/TopicContext';
import { roleOptions } from './data/roleOptions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ChatFormProps {
  onSubmit: (data: ChatFormData) => void;
}

export function ChatForm({ onSubmit }: ChatFormProps) {
  const { topicExists, addTopic } = useTopics();
  const [formData, setFormData] = useState<ChatFormData>({
    yourRole: 'Who are you?',
    expectedRole: 'Who do you want to connect with?',
    topic: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Ensure all required fields are filled
    if (formData.expectedRole && formData.topic) {
      // If the topic doesn't exist, add it locally (optional)
      if (!topicExists(formData.topic)) {
        addTopic(formData.topic);
      }
  
      try {
        // Make a POST request to your backend
        const response = await fetch('http://localhost:3000/api/requestQueue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Send formData to the backend
        });
  
        // Handle response
        if (response.ok) {
          const data = await response.json();
          console.log('Chatroom created successfully:', data);
          onSubmit(formData); // Call parent function after successful submission
        } else {
          console.error('Failed to create chatroom:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else {
      console.error('Please fill all required fields.');
    }
  };
  

  const handleTopicSelect = (topic: string) => {
    setFormData(prev => ({ ...prev, topic }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md  text-black">
      <SearchableSelect
        options={roleOptions}
        value={formData.yourRole}
        onChange={(value) => setFormData(prev => ({ ...prev, yourRole: value as string }))}
        placeholder="Search for your role..."
        label="Your Role"
      />

      <SearchableSelect
        options={roleOptions}
        value={formData.expectedRole}
        onChange={(value) => setFormData(prev => ({ ...prev, expectedRole: value as string }))}
        placeholder="Search for expected role..."
        label="Looking for Role"
      />

      <div className="space-y-2">
        <Label className="block text-sm font-medium  text-black">
          Topic
        </Label>
        <TopicSearch onSelect={handleTopicSelect} />
        <Input
          type="text"
          value={formData.topic}
          onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Or enter a new topic"
          
        />
      </div>

      <Button
        type="submit"
        className="w-18 h-8 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Join Chat
      </Button>
    </form>
  );
}