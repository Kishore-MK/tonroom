import { useState } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChatFormData } from "./types/chat";
import { Label } from "./ui/label";

interface ChatFormProps {
  setStatus: (data:'form' | 'waiting' | 'room'|'payment') => void;
}
export function TransferTon({setStatus}:ChatFormProps) {
  const { sender, connected } = useTonConnect();

  const [tonAmount, setTonAmount] = useState("0.01");
  const [tonRecipient, setTonRecipient] = useState(
    "0QBe_69aFfDIHL0WTlJZe_bXcPkFC29JEQlnkEGt_qfzgrSo"
  );

  return (
    
      <div className="text-black ">
        <h3>Transfer TON</h3>
        <div className="space-y-3">
        <div className="flex space-x-2 items-center">
          <label>Amount </label>
          <Input
            style={{ marginRight: 8 }}
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(e.target.value)}
          ></Input>
        </div>
        <div className="flex space-x-2 items-center">
          <label>To </label>
          <Label
            style={{ marginRight: 8 }}
            
          >{tonRecipient}</Label>
        </div>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={async () => {
    sender.send({
      to: Address.parse(tonRecipient),
      value: toNano(tonAmount),
    });
    setTimeout(()=>{setStatus('room')},8000);
    
    
  }}
        >
          Transfer
        </Button>
        </div>
      </div>
  
  );
}
