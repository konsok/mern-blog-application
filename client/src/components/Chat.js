import mqtt from "precompiled-mqtt";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const client = mqtt.connect("ws://localhost:8000/mqtt");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current) {
      client.on("connect", () => {
        console.log("connected");
        client.subscribe("chat");
      });
      client.on("message", (topic, message) => {
        if (topic === "chat") {
          console.log(JSON.parse(message.toString()));
          setMessages((messages) => [...messages, message.toString()]);
        }
      });
    }
    isSecondRender.current = true;
  }, []);

  const sendMessage = () => {
    client.publish("chat", JSON.stringify({ message: input, username }));
    setInput("");
    console.log("message sent");
  };
  return (
    <div className="chat">
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>send</button>
      <div className="chat-box">
        {messages.map((message, messageIndex) => (
          <div key={messageIndex} className="chat-text">
            {JSON.parse(message).username}: {JSON.parse(message).message}
          </div>
        ))}
      </div>
    </div>
  );
}
