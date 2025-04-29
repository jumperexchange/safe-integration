import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Bridge } from "./pages/Bridge";
import { Swap } from "./pages/Swap";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bridge />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/bridge" element={<Bridge />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
