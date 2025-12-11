import { useEffect } from "react";
import socket from "../socket";

function useSocketEvent(event, handler) {
  useEffect(() => {
    socket.on(event, handler);
    return () => {
      socket.off(event, handler);
    };
  }, [event, handler]);
}

export default useSocketEvent;
