import styles from "./LobbyLogo.module.css";
import logo from "./logo.gif";

function LobbyLogo() {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <img src={logo} alt="school" />
      </div>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          <div className={styles.color}></div>
          <div className={styles.eyes}></div>
          <div className={styles.mouth}></div>
        </div>
        <div className={styles.avatar}>
          <div className={styles.color2}></div>
          <div className={styles.eyes2}></div>
          <div className={styles.mouth2}></div>
        </div>
        <div className={styles.avatar}>
          <div className={styles.color3}></div>
          <div className={styles.eyes3}></div>
          <div className={styles.mouth3}></div>
        </div>
        <div className={styles.avatar}>
          <div className={styles.color4}></div>
          <div className={styles.eyes4}></div>
          <div className={styles.mouth4}></div>
        </div>
        <div className={styles.avatar}>
          <div className={styles.color5}></div>
          <div className={styles.eyes5}></div>
          <div className={styles.mouth5}></div>
        </div>
        <div className={styles.avatar}>
          <div className={styles.color6}></div>
          <div className={styles.eyes6}></div>
          <div className={styles.mouth6}></div>
        </div>
        <div className={styles.avatar}>
          <div className={styles.color7}></div>
          <div className={styles.eyes7}></div>
          <div className={styles.mouth7}></div>
        </div>
      </div>
    </div>
  );
}

export default LobbyLogo;
