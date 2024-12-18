import { useState } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChatFormData } from "./types/chat";
import { Label } from "./ui/label";
import { useTonAddress } from '@tonconnect/ui-react';
import TonWeb from "tonweb";
interface ChatFormProps {
  setStatus: (data:'form' | 'waiting' | 'room'|'payment') => void;
  data: ChatFormData
}
export function TransferTon({setStatus,data}:ChatFormProps) {
  const { sender, connected } = useTonConnect();
  const MyAddress=useTonAddress();
  const [tonAmount, setTonAmount] = useState("0.02");
  const [tonRecipient, setTonRecipient] = useState(
    "0QBe_69aFfDIHL0WTlJZe_bXcPkFC29JEQlnkEGt_qfzgrSo"
  );

  async function paymentStatus(){
    const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {apiKey: '66ad80139d0f9435cca90b5244fb851098f8a7a039642da1f25582d00925eb6b'}));
    const valid =  await tonweb.getTransactions(MyAddress,10);
    // await fetch(`https://testnet.toncenter.com/api/v2/getTransactions?address=0QA4qksZNIhxAngK3sRK1suRzCuAY096YiPusghROu1lL3vI&api_key=66ad80139d0f9435cca90b5244fb851098f8a7a039642da1f25582d00925eb6b&limit=10&to_lt=0&archival=false`)
    const check1 = valid[0]?.out_msgs[0]?.destination.slice(1, -3);
    const fee1 = valid[0]?.out_msgs[0]?.value;
    // const validated = await valid.json();
    if(check1 ==="QBe_69aFfDIHL0WTlJZe_bXcPkFC29JEQlnkEGt_qfzg" && fee1==="20000000")
    {
      return valid[0];
    }
    else
    {
      const dest =await valid.filter((trx: any) => {
        console.log("Processing transaction:", trx);
        const destination = trx?.out_msgs[0]?.destination;
        const fee = trx?.out_msgs[0]?.value;
  
        if (typeof destination === "string" && destination.length > 3) {
          const sliced = destination.slice(1, -3);
          console.log("Sliced destination:", sliced);
          return sliced ==="QBe_69aFfDIHL0WTlJZe_bXcPkFC29JEQlnkEGt_qfzg" && fee==="20000000";
        }
        console.warn("Invalid transaction:", trx);
        return false;
      });

      return dest;
    }
    
    
    
  }
  

  async function validateTransaction(){
    const transfer= async () => {
      sender.send({
        to: Address.parse(tonRecipient),
        value: toNano(tonAmount),
      });
          
    }

    const res = await transfer();
    const status = await paymentStatus();

    console.log(status.length);
    
    if(status.length>0){
      setStatus('room');
    }
    else{
      setStatus('room');
    } 
  }
  
  return (
    
      <div className="container text-black ">
        <h3>Transfer TON</h3>
        <div className="space-y-3">
        <div className="flex space-x-2 items-center">
          <label>Amount </label>
          <Label
            style={{ marginRight: 8 }}
            >
              {tonAmount}
            </Label>
        </div>
        <div className="flex space-x-2 items-center">
          <label>To </label>
          <Label className='overflow-scroll '
            style={{ marginRight: 8 }}
            
          >{tonRecipient}</Label>
        </div>
        <Button 
        disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={async ()=>await validateTransaction()}
        >
          Transfer
        </Button>

        </div>
        <div className='flex font-medium mt-4 items-center justify-center'>
          <p>{`You will joining ${data.creatorRole}'s room for ${data.topic}`}</p>
        </div>
      </div>
  
  );
}
