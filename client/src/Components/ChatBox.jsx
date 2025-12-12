import { useState } from "react";
import styles from "./ChatBox.module.css";
import socket from "../socket";
import useSocketEvent from "../hooks/useSocketEvent";

function ChatBox() {
  const [chat, setChat] = useState("");
  const [guess, setGuess] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setGuess((prev) => [...prev, chat]);
      console.log(chat);

      socket.emit("chat", chat);
      setChat("");
    }
  };

  useSocketEvent("chat", (message) => {
    console.log("recived", message);
    setGuess((prev) => [...prev, message]);
  });
  console.log(guess);

  return (
    <div>
      <div className={styles.chatContent}>
        {guess.map((chat, i) => (
          <p key={i}>{chat}</p>
        ))}
      </div>

      <form
        className={styles.chatForm}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className={styles.chatInput}
          type="text"
          placeholder="Enter Your Guess"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
      </form>
    </div>
  );
}

export default ChatBox;
