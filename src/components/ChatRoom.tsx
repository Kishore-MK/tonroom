import React from 'react';
import { ChatFormData } from './types/chat';
import { TransferTon } from './TransferTon';
import { ConnectionPanel } from './ConnectionPanel';
import { Timer } from './Timer';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Toaster } from 'react-hot-toast';

interface ChatRoomProps {
  data: ChatFormData;
}

export function ChatRoom({ data }: ChatRoomProps) {
  return (
    <>
    <div className="container mx-auto max-w-3xl h-full bg-white shadow-lg">
      <ConnectionPanel />
      <Timer />
      <div className="flex flex-col h-[calc(100vh-180px)]">
        <MessageList />
        <ChatInput />
      </div>
    </div>
    <Toaster />
  </>
  );
}