import { useState } from "react";
import styles from "./Room.module.css";
import { Link, useParams } from "react-router-dom";
import socket from "../socket";

function Room() {
  const { roomId } = useParams();
  const [name, setName] = useState("");

  const joinRoom = () => {
    if (!name) return;
    socket.emit("join-room", { roomId, name });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <Link to="/gameroom">
            <button onClick={joinRoom} className={styles.btn}>
              Join
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Room;
