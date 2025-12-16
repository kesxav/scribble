import { useState, useEffect } from "react";
import { PlayerInfoContext } from "./PlayerInfoContext";
import useSocketEvent from "../hooks/useSocketEvent";
import socket from "../socket";

function PlayerInfoProvider({ children, roomId }) {
  const [name, setName] = useState([]);

  useSocketEvent("players-update", ({ playersNames, roomId: id }) => {
    if (id === roomId) {
      setName(playersNames);
    }
  });

  // Extract roomId from URL and initialize players
  useEffect(() => {
    if (roomId) {
      // Request current players in the room
      socket.emit("get-players", roomId);
    }
  }, [roomId]);

  return (
    <PlayerInfoContext.Provider value={{ name }}>
      {children}
    </PlayerInfoContext.Provider>
  );
}

export default PlayerInfoProvider;
