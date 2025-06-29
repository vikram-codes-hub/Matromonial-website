import React, { useState, useContext } from "react";
import { Authcontext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

const Chatpage = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const { authuser } = useContext(Authcontext);
const navigate=useNavigate()
  const sendMessage = () => {
    // socket emit logic here
  };

  if (!authuser?.isPremium) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 text-center border shadow rounded">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Premium Feature</h2>
        <p className="text-gray-700">You need a premium account to access in-app chat.</p>
      <p
  className="text-blue-600 hover:underline cursor-pointer mt-2"
  onClick={() => navigate("/membership")}
>
  Go to Membership page
</p>

      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 border p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Real-Time Chat</h2>
      <div className="h-64 overflow-y-auto mb-4 border p-2 rounded bg-gray-100">
        {chatLog.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="text-sm text-gray-800">{msg}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatpage;
