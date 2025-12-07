import { useState } from "react";
import styles from "./LobbyCreate.module.css";

function LobbyCreate() {
  const [drawTime, setDrawTime] = useState("60");
  const [rounds, setRounds] = useState(2);
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [iplimit, setIpLimit] = useState(2);
  const [customWords, setCustomWords] = useState(3);

  const MIN = 10;
  const MAX = 300;

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (newValue === "") {
      setDrawTime("");
      return;
    }

    if (!/^\d+$/.test(newValue)) return;

    const numValue = Number(newValue);

    if (numValue <= MAX) {
      setDrawTime(newValue);
    }
  };

  const handleBlur = () => {
    if (drawTime === "" || Number(drawTime) < MIN) {
      setDrawTime(String(MIN));
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
  };

  const handleIncDrawTime = () => {
    if (drawTime >= 300) return;
    setDrawTime(parseInt(drawTime) + 1);
  };

  const handleDecDrawTime = () => {
    if (drawTime <= 0) return;
    setDrawTime(parseInt(drawTime) - 1);
  };

  const handleIncRounds = () => {
    if (rounds >= 20) return;
    setRounds(parseInt(rounds) + 1);
  };
  const handleDecRounds = () => {
    if (rounds <= 1) return;
    setRounds(parseInt(rounds) - 1);
  };

  const handleIncPlayers = () => {
    if (maxPlayers >= 20) return;
    setMaxPlayers(parseInt(maxPlayers) + 1);
  };
  const handleDecPlayers = () => {
    if (maxPlayers <= 1) return;
    setMaxPlayers(parseInt(maxPlayers) - 1);
  };

  const handleIncIpLimit = () => {
    if (iplimit >= 20) return;
    setIpLimit(parseInt(iplimit) + 1);
  };
  const handleDecIpLimit = () => {
    if (iplimit <= 1) return;
    setIpLimit(parseInt(iplimit) - 1);
  };

  const handleIncCustomWords = () => {
    if (customWords >= 20) return;
    setCustomWords(parseInt(customWords) + 1);
  };
  const handleDecCustomWords = () => {
    if (customWords <= 1) return;
    setCustomWords(parseInt(customWords) - 1);
  };

  return (
    <div className={styles.homeChoices}>
      <div className={styles.homeChoice}>
        <div className={styles.homeChoiceInner}>
          <div className={styles.header}>
            <div className={styles.title}>Create Lobby</div>
          </div>
          <form className={styles.form} onSubmit={handleSumbit}>
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
              <button
                className={styles.numberdecrement}
                onClick={handleDecDrawTime}
              >
                -
              </button>
              <input
                type="text"
                value={drawTime}
                onChange={handleChange}
                onBlur={handleBlur}
                pattern="[0-9]*"
                inputMode="numeric"
              ></input>
              <button
                className={styles.numberincrement}
                onClick={handleIncDrawTime}
              >
                +
              </button>
            </div>
            <label className={styles.label}>Rounds</label>
            <div className={styles.numberInput}>
              <button
                className={styles.numberdecrement}
                onClick={handleDecRounds}
              >
                -
              </button>
              <input
                type="text"
                value={rounds}
                onChange={(e) => setRounds(e.target.value)}
              ></input>
              <button
                className={styles.numberincrement}
                onClick={handleIncRounds}
              >
                +
              </button>
            </div>
            <label className={styles.label}>Maximum Players</label>
            <div className={styles.numberInput}>
              <button
                className={styles.numberdecrement}
                onClick={handleDecPlayers}
              >
                -
              </button>
              <input
                type="number"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(e.target.value)}
              ></input>
              <button
                className={styles.numberincrement}
                onClick={handleIncPlayers}
              >
                +
              </button>
            </div>
            <label className={styles.label}>Players per IP Limit</label>
            <div className={styles.numberInput}>
              <button
                className={styles.numberdecrement}
                onClick={handleDecIpLimit}
              >
                -
              </button>
              <input
                value={iplimit}
                onChange={(e) => setIpLimit(e.target.value)}
              ></input>
              <button
                className={styles.numberincrement}
                onClick={handleIncIpLimit}
              >
                +
              </button>
            </div>
            <label className={styles.label}>Custom Words Per Turn</label>
            <div className={styles.numberInput}>
              <button
                className={styles.numberdecrement}
                onClick={handleDecCustomWords}
              >
                -
              </button>
              <input
                value={customWords}
                onChange={(e) => setCustomWords(e.target.value)}
              ></input>
              <button
                className={styles.numberincrement}
                onClick={handleIncCustomWords}
              >
                +
              </button>
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
      {/* Joining section */}
      <div className={styles.homeChoice}>
        <div className={styles.homeChoiceInner}>
          <div className={styles.header}>
            <div className={styles.title}>Join Lobby</div>
            <button>Refresh</button>
          </div>
          <div className={styles.lobbyListHolder}>
            <b>There are no lobbies</b>
            <b></b>
          </div>
          <div className={styles.lobbyList}>
            <div className={styles.lobbyListItem}>
              <div className={styles.lobbyListRows}>
                <div className={styles.lobbyListRow}>
                  <span>Us</span>
                  <span>chill</span>
                </div>
                <div className={styles.lobbyListRow}>
                  <div className={styles.lobbyItemInfo}>
                    <img
                      className={styles.lobbyItemIcon}
                      src="https://scribblers.bios-marcel.link/resources/user.svg?cache_bust=1243f075705ec5e1376c4bce070ee728"
                    />
                    <span>0/24</span>
                  </div>
                  <div className={styles.lobbyItemInfo}>
                    <img
                      className={styles.lobbyItemIcon}
                      src="https://scribblers.bios-marcel.link/resources/round.svg?cache_bust=563c339531de7439d1c211fe67b249c8"
                    />
                    <span>0/4</span>
                  </div>
                  <div className={styles.lobbyItemInfo}>
                    <img
                      className={styles.LobbyItemIcon}
                      src="https://scribblers.bios-marcel.link/resources/clock.svg?cache_bust=d120f9bb6960ca746140695a18fd3255"
                    />
                    <span>120</span>
                  </div>
                </div>
              </div>
              <button className={styles.joinButton}>Join</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LobbyCreate;
