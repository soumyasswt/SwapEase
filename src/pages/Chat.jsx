import { useState, useEffect } from "react";
import { chatCollection } from "../firebase/config";
import { addDoc, getDocs } from "firebase/firestore";

const Chat = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getDocs(chatCollection);
      setMessages(data.docs.map((doc) => doc.data()));
    };
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    await addDoc(chatCollection, { chatId, message, timestamp: new Date() });
    setMessage("");
  };

  return (
    <div>
      <h3>Chat</h3>
      {messages.map((msg, index) => (
        <p key={index}>{msg.message}</p>
      ))}
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
export default Chat;
