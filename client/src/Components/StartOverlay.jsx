import styles from "./StartOverlay.module.css";

function StartOverlay({ onStart }) {
  return (
    <div className={styles.overlay}>
      <button className={styles.startBtn} onClick={onStart}>
        Start
      </button>
    </div>
  );
}

export default StartOverlay;
