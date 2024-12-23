import "./App.css";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { TransferTon } from "./components/TransferTon";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import React, { useEffect, useState } from 'react';
import { ChatForm } from './components/ChatForm';
import { ThemeProvider } from './components/context/ThemeContext';
import { TopicProvider } from './components/context/TopicContext';
import { ThemeToggle } from './components/ThemeToggle';
import { ChatFormData } from './components/types/chat';
import { MessageCircle } from 'lucide-react';
import { WaitingRoom } from './components/WaitingRoom';
import { ChatRoom } from './components/ChatRoom';
import { Button } from "./components/ui/button";

import { ConnectionPanel } from './components/ConnectionPanel';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { Timer } from './components/Timer';
import { initializePeerConnection } from './utils/peerConnection';
import { Toaster } from 'react-hot-toast';
import Viewchatrooms from "./components/Viewchatrooms";



function App() {
  const { network,wallet } = useTonConnect();
  const [status, setStatus] = useState('form');
  const [formData, setFormData] = useState<ChatFormData | null>(null);
  
  const handleSubmit = (val: string,data:ChatFormData) => {
  setFormData(data)
    setStatus(val);
  };

  const handleTimeout = () => {
    setStatus('form');
    setFormData(null);
  };
  useEffect(() => {
    initializePeerConnection();
  }, []);

  return (
    <div className="bg-gray-50 ">
    
    <div className="container mx-auto px-4 py-4 ">
      <TopicProvider>
      <div className="flex space-x-2 absolute right-0 mt-4">
        
            <TonConnectButton className="text-white"/>
            <Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : ""}
            </Button>
      </div>
     
      
        <div className="min-h-screen transition-colors duration-200 mt-8">
  
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="text-center space-y-4">
                
                <h1 className="text-4xl font-bold text-black">
                  Welcome to TonRoom
                </h1>
                <p className=" text-black">
                </p>
              </div>
              
                
                
              {status === 'form' && (
                <>
                <Viewchatrooms onSubmit={handleSubmit}/>
                <p className='flex justify-center text-2xl font-bold text-black'>OR</p>

                <ChatForm onSubmit={handleSubmit} />
                </>
              )}

              {status === 'waiting' && formData && (
                <WaitingRoom 
                  ReqQueue={formData}
                  onTimeout={handleTimeout}
                />
              )}

              {status === 'room' && formData && (
                <ChatRoom data={formData} setStatus={setStatus}/>
              )}
              {status === 'payment' && formData && (
                <TransferTon setStatus={setStatus} data={formData}/>
              )}
            </div>
          </div>
      
      </TopicProvider>
    
    </div> 
    </div>
  );
}

export default App;

 