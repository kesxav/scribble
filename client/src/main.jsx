import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import CanvasBoard from "./Components/CanvasBoard.jsx";
import PlayerInfoProvider from "./context/PlayerInfoProvider.jsx";

import Room from "./Components/Room.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/room/:roomId",
    element: <Room />,
    children: [
      {
        path: "gameroom",
        element: <CanvasBoard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
   
      <RouterProvider router={router} />

  </StrictMode>
);
