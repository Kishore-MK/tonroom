import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { ChatFormData } from './types/chat';
interface props{
  onSubmit: (val:string,data: ChatFormData) => void;

}
const Viewchatrooms = ({onSubmit}:props) => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('http://localhost:8080/request-queue');
        const out = await res.json();
        console.log('Chat rooms:', out);

        const add = await fetch(
          'https://testnet.toncenter.com/api/v2/getAddressBalance?address=0QA4qksZNIhxAngK3sRK1suRzCuAY096YiPusghROu1lL3vI'
        );
        const val = await add.json();
        console.log('Balance:', val);

        setRooms(out);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRooms(); 
  }, []); 
 const filteredRooms = rooms.filter((room: any) =>
  room.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
  room.creatorRole.toLowerCase().includes(searchTerm.toLowerCase())||
  room.participantRole.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
  <div className="container mx-auto w-full max-w-md">
    

    <div className="my-4">
    <p className="flex justify-center text-2xl font-bold text-black mb-3">
      Search ChatRooms
    </p>
      <input
        type="text"
        placeholder="Search by topic or creator..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room: any, index) => (
          <div key={index} className="container p-2 flex justify-between">
            {`${room.creatorRole} created by ${room.participantRole}`}
            <Button
              onClick={() => {onSubmit("payment",{topic:room.topic,creatorRole:room.creatorRole,participantRole:room.participantRole})}}
              className="w-18 h-8 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Join Chat
            </Button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No rooms found</p>
      )}
    </div>
  </div>
);
};

export default Viewchatrooms;
