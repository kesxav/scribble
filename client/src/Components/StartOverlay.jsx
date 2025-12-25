import styles from "./StartOverlay.module.css";

function StartOverlay({ onStart, isHost }) {
  return (
    <div className={styles.overlay}>
      <button className={styles.startBtn} onClick={onStart} disabled={!isHost}>
        {isHost ? "Start" : "Wait to Start"}
      </button>
    </div>
  );
}

export default StartOverlay;
