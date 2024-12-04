import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { SearchableOption } from './types/chat';

interface SearchableSelectProps {
  options: SearchableOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

export function SearchableSelect({ options, value, onChange, placeholder, label }: SearchableSelectProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [query, options]);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium  text-black mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedOption?.label || placeholder}
          className="w-full px-10 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700">
          <ul className="max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => {
                  onChange(option.value);
                  setQuery('');
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer dark:text-white"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}