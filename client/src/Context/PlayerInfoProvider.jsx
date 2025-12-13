import { useState } from "react";
import { PlayerInfoContext } from "./PlayerInfoContext";
import useSocketEvent from "../hooks/useSocketEvent";

function PlayerInfoProvider({ children }) {
  const [name, setName] = useState([]);

  useSocketEvent("PlayerAdded", (name) => {
    console.log("name", name);
    setName((prev) => [...prev, name]);
  });
  console.log(name);
  return (
    <PlayerInfoContext.Provider value={{ name }}>
      {children}
    </PlayerInfoContext.Provider>
  );
}

export default PlayerInfoProvider;
