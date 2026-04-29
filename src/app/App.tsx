import "./styles/index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/home/ui/HomePage";
import { CliPage } from "../pages/cli";

const router = createHashRouter([
  { path: "/", element: <HomePage /> },
  { path: "/cli", element: <CliPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
