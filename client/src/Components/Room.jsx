import { useState } from "react";
import { nanoid } from "nanoid";
import styles from "./Room.module.css";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../socket";

function Room() {
  const { roomId } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  let playerId = localStorage.getItem("playerId");
  if (!playerId) {
    playerId = nanoid();
    localStorage.setItem("playerId", playerId);
  }

  const joinRoom = () => {
    navigate(`/room/${roomId}/gameroom`);
    if (!name) return;
    socket.emit("join-room", {
      roomId,
      player: {
        playerId,
        name,
      },
    });
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
          <button onClick={joinRoom} className={styles.btn}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;
