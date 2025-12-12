import { useState } from "react";
import styles from "./Name.module.css";
import socket from "../socket";
import { Link } from "react-router-dom";

function Name() {
  const [name, setName] = useState("");

  const handleName = () => {
    if (!name) return;

    socket.emit("name", name);
  };

  return (
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
          <button onClick={handleName} className={styles.btn}>
            Play
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Name;
