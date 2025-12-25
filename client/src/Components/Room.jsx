import { useState } from "react";
import { nanoid } from "nanoid";
import styles from "./Room.module.css";
import { useNavigate, useParams, Outlet, useLocation } from "react-router-dom";
import socket from "../socket";
import PlayerInfoProvider from "../Context/PlayerInfoProvider";

function Room() {
  const { roomId } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isGameRoom = location.pathname.includes("/gameroom");

  let playerId = localStorage.getItem("playerId");
  if (!playerId) {
    playerId = nanoid();
    localStorage.setItem("playerId", playerId);
  }

  const joinRoom = () => {
    if (!name) return;
    socket.emit("join-room", {
      roomId,
      player: {
        playerId,
        name,
      },
    });
    navigate("gameroom");
  };

  const roomLink = `${window.location.origin}/room/${roomId}`;

  return (
    <PlayerInfoProvider roomId={roomId}>
      <div className={styles.container}>
        <Outlet />
        {!isGameRoom && (
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
            <div className={styles.buttons}>
              <button onClick={joinRoom} className={styles.btn}>
                Join
              </button>
              <button
                className={styles.btn1}
                onClick={() => navigator.clipboard.writeText(roomLink)}
              >
                Copy Room Link
              </button>
            </div>
          </div>
        )}
      </div>
    </PlayerInfoProvider>
  );
}

export default Room;
