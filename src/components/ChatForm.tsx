import React, { useState } from 'react';
import { ChatFormData } from './types/chat';
import { useTopics } from './context/TopicContext';
import { roleOptions } from './data/roleOptions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Viewchatrooms from './Viewchatrooms';
import { useTonWallet } from '@tonconnect/ui-react';

interface ChatFormProps {
  
  onSubmit: (val:string,data: ChatFormData) => void;
}

export function ChatForm({ onSubmit }: ChatFormProps) {
 
  const [yourole, setYourrole] = useState("");
  const [expectedrole, setExpectedrole] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const address = "";
    console.log(address);
    
    const data={
      topic: topic,
      creatorRole:yourole,
      participantRole:expectedrole
      
    }
    
    const response = await fetch('http://localhost:8080/request-queue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send formData to the backend
    });
    setExpectedrole("");
    setTopic("");
    setYourrole("");
    onSubmit("waiting",data)
  };
  


  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md  text-black">
      <p className='flex justify-center text-2xl font-bold text-black'>Create ChatRooms</p>
      <div className="space-y-2">
        <Label className="block text-sm font-medium  text-black">
          Topic
        </Label>
        <input className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
required
        onChange={(e) => {setTopic(e.target.value)}}
        placeholder="Enter the topic..."
      />
        
      </div>
      <div className="space-y-2">
      <Label className=" text-sm font-medium  text-black">
          Your Role
        </Label>
      <input className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  required
        onChange={(e) => {setYourrole(e.target.value)}}
        placeholder="Enter your role..."
      />
      </div>
       <div className="space-y-2">
<Label className=" text-sm font-medium  text-black">
          Expected Role
        </Label>
    <input className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  required
        onChange={(e) => {setExpectedrole(e.target.value)}}
        placeholder="Enter expected role..."
      />
      </div>

      
      <Button type='submit'
            className="w-18 h-8 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Create Chat
          </Button>

      
    </form>
  );
}
