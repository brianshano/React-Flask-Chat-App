import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
import { SocketContext, socket } from "./context/socket";
import Child from "./components/Child";

// let endPoint = "http://localhost:5000";
// let socket1 = io.connect(`${endPoint}`);

const App = () => {
  const [messages, setMessages] = useState(["Hello And Welcome"]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("in useEffect");
    console.log("run getMessages");
    socket.on("message", (msg) => {
      console.log("message", msg);
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      setMessages([...messages, msg]);
    });
  }, [messages.length]);

  // const getMessages = () => {

  // };

  // On Change
  const onChange = (e) => {
    console.log("on change");
    setMessage(e.target.value);
  };

  // On Click
  const onClick = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  return (
    <SocketContext.Provider value={socket}>
      <div>
        {messages.length > 0 &&
          messages.map((msg) => (
            <div>
              <p>{msg}</p>
            </div>
          ))}
        <input value={message} name="message" onChange={(e) => onChange(e)} />
        <button onClick={() => onClick()}>Send Message</button>
      </div>
      <Child />
    </SocketContext.Provider>
  );
};

export default App;
