import { useParams } from "react-router-dom";
import socket from "../socket";
import styles from "./WordChoices.module.css";

function WordChoices({ phase, drawer, selected, wordChoices, canDraw }) {
  const { roomId } = useParams();
  if (phase !== "wordChoice") return null;

  if (canDraw && !selected) {
    return (
      <div className={styles.overlay}>
        <h1 className={styles.title}>Choose A Word:</h1>
        <div className={styles.btnContainer}>
          {wordChoices.map((words) => (
            <button
              className={styles.btn}
              key={words}
              onClick={() => socket.emit("word:select", { words, roomId })}
            >
              {words}
            </button>
          ))}
        </div>
      </div>
    );
  }
  if (!canDraw && phase === "wordChoice") {
    return (
      <div className={styles.overlay}>
        {drawer?.playerName} is choosing a word
      </div>
    );
  }
}

export default WordChoices;
