import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useTopics } from './context/TopicContext';
import { Topic } from './types/chat';

interface TopicSearchProps {
  onSelect: (topic: string) => void;
}

export function TopicSearch({ onSelect }: TopicSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Topic[]>([]);
  const { searchTopic } = useTopics();

  useEffect(() => {
    if (query.trim()) {
      setResults(searchTopic(query));
    } else {
      setResults([]);
    }
  }, [query, searchTopic]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for existing topics..."
          className="w-full px-10 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700">
          <ul className="max-h-60 overflow-auto">
            {results.map((topic) => (
              <li
                key={topic.id}
                onClick={() => onSelect(topic.name)}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span className="dark:text-white">{topic.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {topic.participants} participant{topic.participants !== 1 ? 's' : ''}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}