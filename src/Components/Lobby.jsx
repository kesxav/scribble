import styles from "./Lobby.module.css";

function Lobby() {
  return (
    <div className={styles.main}>
      <div className={styles.title}></div>
      <div className={styles.container}>
        <div>
          <input type="text" placeholder="Enter your name" />
        </div>
        <div>
          <button>Create Room</button>
          <button>Join Room</button>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
