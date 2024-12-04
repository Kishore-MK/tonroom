import React from 'react';
import { ChatFormData } from './types/chat';
import { TransferTon } from './TransferTon';

interface ChatRoomProps {
  data: ChatFormData;
}

export function ChatRoom({ data }: ChatRoomProps) {
  return (
    <div className="text-center space-y-4 dark:text-white">
     <TransferTon/>
    </div>
  );
}