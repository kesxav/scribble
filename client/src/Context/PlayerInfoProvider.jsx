import { useState } from "react";
import { PlayerInfoContext } from "./PlayerInfoContext";
import useSocketEvent from "../hooks/useSocketEvent";

function PlayerInfoProvider({ children }) {
  const [name, setName] = useState([]);

  useSocketEvent("players-update", (player) => {
    console.log(player);
    setName(player);
  });
  console.log(name);
  return (
    <PlayerInfoContext.Provider value={{ name }}>
      {children}
    </PlayerInfoContext.Provider>
  );
}

export default PlayerInfoProvider;
