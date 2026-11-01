import "./styles/index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/home/ui/HomePage";

const router = createHashRouter([
  { path: "/", element: <HomePage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
