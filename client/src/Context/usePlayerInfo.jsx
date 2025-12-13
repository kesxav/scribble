import { useContext } from "react";
import { PlayerInfoContext } from "./PlayerInfoContext";

export default function usePlayerInfo() {
  return useContext(PlayerInfoContext);
}
