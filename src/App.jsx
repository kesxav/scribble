// import CanvasBoard from "./Components/CanvasBoard";
import styles from "./App.module.css";
import Lobby from "./Components/Lobby";
function App() {
  return (
    <div className={styles.app}>
      {/* <h1>Hello</h1>
      <CanvasBoard />
      <h2>byee</h2> */}
      <Lobby />
    </div>
  );
}

export default App;
