import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AdminDataProvider } from "./context/AdminDataContext";

createRoot(document.getElementById("root")!).render(
  <AdminDataProvider>
    <App />
  </AdminDataProvider>,
);
