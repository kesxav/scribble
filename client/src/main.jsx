import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import CanvasBoard from "./Components/CanvasBoard.jsx";
import PlayerInfoProvider from "./Context/PlayerInfoProvider.jsx";

import Room from "./Components/Room.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [{ path: "/gameroom", Component: <GameRoom /> }],
  },
  {
    path: "/room/:roomId/gameroom",
    element: <CanvasBoard />,
  },
  {
    path: "/room/:roomId",
    element: <Room />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayerInfoProvider>
      <RouterProvider router={router} />
    </PlayerInfoProvider>
  </StrictMode>
);
