import LobbyCreate from "./LobbyCreate";
import LobbyLogo from "./LobbyLogo";
import styles from "./Lobby.module.css";

function Lobby() {
  return (
    <div className={styles.main}>
      <LobbyLogo />

      <LobbyCreate />
    </div>
  );
}

export default Lobby;
