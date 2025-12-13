import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import CanvasBoard from "./Components/CanvasBoard.jsx";
import PlayerInfoProvider from "./Context/PlayerInfoProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [{ path: "/gameroom", Component: <GameRoom /> }],
  },
  {
    path: "/gameroom",
    element: <CanvasBoard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayerInfoProvider>
      <RouterProvider router={router} />
    </PlayerInfoProvider>
  </StrictMode>
);
