import React, { useState } from 'react'
import { Button } from './ui/button'

const Viewchatrooms = () => {
    const [rooms,setrooms]=useState([])
    const call = async()=>{
        const res=await fetch("http://localhost:8080/request-queue")
        const out =await res.json()
        console.log(out);
        const add= await fetch("https://testnet.toncenter.com/api/v2/getAddressBalance?address=0QA4qksZNIhxAngK3sRK1suRzCuAY096YiPusghROu1lL3vI")
        const val=await add.json()
        console.log(val);
        
        
        setrooms(out)
    }
  return (
    <div className='container mx-auto'>
    <Button onClick={()=>call()}>View all rooms</Button>
    <div>
        {
            rooms.map((room,index)=>{return (<div key={index} className='container p-2'>
                
               { `${room.topic} created by ${room.creator}`}
            </div>)})
        }
    </div>
    </div>
    
  )
}

export default Viewchatrooms