import { useState } from "react";
import useSocketEvent from "../hooks/useSocketEvent";
import styles from "./PlayerList.module.css";

function PlayerList() {
  const [name, setName] = useState([]);

  useSocketEvent("name", (name) => {
    setName((prev) => [...prev, name]);
  });

  console.log(name);

  return (
    <div className={styles.players}>
      <div className={styles.playerList}>
        {name.map((name, i) => (
          <div key={i} className={styles.player}>
            <div className={styles.background}></div>
            <div className={styles.info}>
              <div className={styles.playername}>{name}</div>
              <div className={styles.playerrank}>#1</div>
              <div className={styles.playerscore}>0 points</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerList;
