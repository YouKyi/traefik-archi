import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app/App.tsx";
import { LanguageProvider } from "./i18n/LanguageContext.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/fr" element={<App />} />
      </Routes>
    </LanguageProvider>
  </BrowserRouter>
);
