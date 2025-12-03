import styles from "./LobbyCreate.module.css";

function LobbyCreate() {
  return (
    <div className={styles.homeChoices}>
      <div className={styles.homeChoice}>
        <div className={styles.homeChoiceInner}>
          <div className={styles.header}>
            <div className={styles.title}>Create Lobby</div>
          </div>
          <form className={styles.form}>
            <label className={styles.label}>Language</label>
            <select>
              <option>English</option>
            </select>
            <label className={styles.label}>Scoring</label>
            <select>
              <option>Chill</option>
              <option>Competitive</option>
            </select>
            <label className={styles.label}>Drawing Time</label>
            <div className={styles.numberInput}>
              <button className={styles.numberdecrement}>-</button>
              <input min={60} max={300} value={120}></input>
              <button className={styles.numberincrement}>+</button>
            </div>
            <label className={styles.label}>Rounds</label>
            <div className={styles.numberInput}>
              <button className={styles.numberdecrement}>-</button>
              <input min={1} max={20} value={5}></input>
              <button className={styles.numberincrement}>+</button>
            </div>
            <label className={styles.label}>Maximum Players</label>
            <div className={styles.numberInput}>
              <button className={styles.numberdecrement}>-</button>
              <input min={2} max={20} value={5}></input>
              <button className={styles.numberincrement}>+</button>
            </div>
            <label className={styles.label}>Players per IP Limit</label>
            <div className={styles.numberInput}>
              <button className={styles.numberdecrement}>-</button>
              <input min={1} max={24} value={2}></input>
              <button className={styles.numberincrement}>+</button>
            </div>
            <label className={styles.label}>Custom Words Per Turn</label>
            <div className={styles.numberInput}>
              <button className={styles.numberdecrement}>-</button>
              <input min={1} max={24} value={3}></input>
              <button className={styles.numberincrement}>+</button>
            </div>
            <label className={styles.label}>Custom Words</label>
            <textarea></textarea>
          </form>
          <div className={styles.createButtons}>
            <button className={styles.createButton}>
              "Create Public Room"
            </button>
            <button className={styles.createButton}>
              "Create Private Room"
            </button>
          </div>
        </div>
      </div>
      <div className={styles.homeChoice}></div>
    </div>
  );
}

export default LobbyCreate;
