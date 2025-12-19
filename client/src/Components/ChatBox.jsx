import { useState } from "react";
import styles from "./ChatBox.module.css";
import socket from "../socket";
import useSocketEvent from "../hooks/useSocketEvent";
import { useParams } from "react-router-dom";

function ChatBox() {
  const { roomId } = useParams();
  const [chat, setChat] = useState("");
  const [guess, setGuess] = useState([]);

  useSocketEvent("chat", (text) => {
    setGuess((prev) => [...prev, text]);
  });

  useSocketEvent("player:guessed", ({ name }) => {
    setGuess((prev) => [
      ...prev,
      { type: "system", text: `${name} has guessed the word!` },
    ]);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    if (!chat.trim()) return;

    socket.emit("chat", {
      roomId,
      text: chat.trim(),
    });
    setChat("");
  };
  return (
    <div>
      <div className={styles.chatContent}>
        {guess.map((chat, i) => (
          <p
            key={i}
            className={
              chat.type === "system" ? styles.systemMsg : styles.userMsg
            }
          >
            {chat.type === "system" ? chat.text : `${chat.name}:${chat.text}`}
          </p>
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
