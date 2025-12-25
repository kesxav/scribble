import styles from "./PlayerList.module.css";
import usePlayerInfo from "../Context/usePlayerInfo";

function PlayerList() {
  const { name } = usePlayerInfo() ?? {};

  return (
    <div className={styles.players}>
      <div className={styles.playerList}>
        {name?.map((name, i) => (
          <div key={i} className={styles.player}>
            <div className={styles.background}></div>
            <div className={styles.info}>
              <div className={styles.playername}>{name.playerName}</div>
              <div className={styles.playerscore}>{name.score} points</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerList;
