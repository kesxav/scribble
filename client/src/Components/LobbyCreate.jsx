import { useState } from "react";
import styles from "./LobbyCreate.module.css";
import Name from "./Name";

function LobbyCreate() {
  const [drawTime, setDrawTime] = useState(60);
  const [rounds, setRounds] = useState(5);
  const [maxPlayers, setMaxPlayers] = useState(6);
  const [words, setWords] = useState(3);
  const [hints, setHints] = useState(2);

  const [isShow, setShow] = useState(false);

  const handleSumbit = (e) => {
    e.preventDefault();
  };

  console.log(hints);

  const handleChange = (e, max, set) => {
    const MAX = max;
    const newValue = e.target.value;

    if (newValue === "") {
      set("");
      return;
    }

    if (!/^\d+$/.test(newValue)) return;

    const numValue = Number(newValue);

    if (numValue <= MAX) {
      set(newValue);
    }
  };

  const handleBlur = (min) => {
    const MIN = min;
    if (drawTime === "" || Number(drawTime) < MIN) {
      setDrawTime(String(MIN));
    }
  };

  const handleInc = (max, set, setter) => {
    if (set >= max) return;
    setter(parseInt(set) + 1);
  };

  const handleDec = (min, set, setter) => {
    if (set <= min) return;
    setter(parseInt(set) - 1);
  };

  return (
    <div>
      {isShow ? (
        <Name />
      ) : (
        <div className={styles.homeChoices}>
          <div className={styles.homeChoice}>
            <div className={styles.homeChoiceInner}>
              <div className={styles.header}>
                <div className={styles.title}>Create Lobby</div>
              </div>
              <form className={styles.form} onSubmit={handleSumbit}>
                <label className={styles.label}>Players</label>
                <div className={styles.numberInput}>
                  <button
                    className={styles.numberdecrement}
                    onClick={() => handleDec(2, maxPlayers, setMaxPlayers)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={maxPlayers}
                    onChange={(e) => handleChange(e, 10, setMaxPlayers)}
                    onBlur={() => handleBlur(2)}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  ></input>
                  <button
                    className={styles.numberincrement}
                    onClick={() => handleInc(10, maxPlayers, setMaxPlayers)}
                  >
                    +
                  </button>
                </div>
                <label className={styles.label}>Drawtime</label>
                <div className={styles.numberInput}>
                  <button
                    className={styles.numberdecrement}
                    onClick={() => handleDec(10, drawTime, setDrawTime)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={drawTime}
                    onChange={(e) => handleChange(e, 300, setDrawTime)}
                    onBlur={() => handleBlur(10)}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  ></input>
                  <button
                    className={styles.numberincrement}
                    onClick={() => handleInc(300, drawTime, setDrawTime)}
                  >
                    +
                  </button>
                </div>
                <label className={styles.label}>Rounds</label>
                <div className={styles.numberInput}>
                  <button
                    className={styles.numberdecrement}
                    onClick={() => handleDec(2, rounds, setRounds)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={rounds}
                    onChange={(e) => handleChange(e, 20, setRounds)}
                    onBlur={() => handleBlur(2)}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  ></input>
                  <button
                    className={styles.numberincrement}
                    onClick={() => handleInc(20, rounds, setRounds)}
                  >
                    +
                  </button>
                </div>
                <label className={styles.label}>Word Count</label>
                <div className={styles.numberInput}>
                  <button
                    className={styles.numberdecrement}
                    onClick={() => handleDec(3, words, setWords)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={words}
                    onChange={(e) => handleChange(e, 5, setWords)}
                    onBlur={() => handleBlur(3)}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  ></input>
                  <button
                    className={styles.numberincrement}
                    onClick={() => handleInc(5, words, setWords)}
                  >
                    +
                  </button>
                </div>
                <label className={styles.label}>Hints</label>
                <div className={styles.numberInput}>
                  <button
                    className={styles.numberdecrement}
                    onClick={() => handleDec(1, hints, setHints)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={hints}
                    onChange={(e) => handleChange(e, 4, setHints)}
                    onBlur={() => handleBlur(1)}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  ></input>
                  <button
                    className={styles.numberincrement}
                    onClick={() => handleInc(4, hints, setHints)}
                  >
                    +
                  </button>
                </div>
              </form>
              <div className={styles.createButtons}>
                <button
                  onClick={() => setShow(true)}
                  className={styles.createButton}
                >
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
      )}
    </div>
  );
}

export default LobbyCreate;
