import React, { useEffect, useState, useContext } from 'react';
import { Authcontext } from '../Context/Authcontext';
import { useNavigate } from 'react-router-dom';


const Messages = () => {
  const [disapprovalMessage, setDisapprovalMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const { getCurrentUserData } = useContext(Authcontext);
  const navigate = useNavigate();

useEffect(() => {
  const fetchMessage = async () => {
    try {
      const user = await getCurrentUserData();
      if (user) {
        setDisapprovalMessage(user.disapprovalMessage || "");
        setNotifications(user.notifications || []);
      }
    } catch (error) {
      console.error("Failed to fetch user message", error);
    }
  };
  fetchMessage();
}, [getCurrentUserData]);


  const hasMessages = disapprovalMessage || notifications.length > 0;

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Your Messages</h2>

      {!hasMessages ? (
        <p className="text-gray-500">You have no messages.</p>
      ) : (
        <div className="space-y-4">
          {disapprovalMessage && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-800 rounded shadow">
              <p><strong>Profile Disapproved:</strong> {disapprovalMessage}</p>
            </div>
          )}

          {notifications.map((note, index) => (
            <div
              key={index}
              className="p-4 bg-blue-100 border border-blue-400 text-blue-800 rounded shadow"
            >
              <p className="cursor-pointer" onClick={()=>navigate('/membership')}><strong>{note.type.toUpperCase()}:</strong> {note.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
