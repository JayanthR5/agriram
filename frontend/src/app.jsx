import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Login from "./pages/Login";
import Exporter from "./pages/ExporterDashboard";
import QA from "./pages/QADashboard";
import Cert from "./pages/Certificate";
import Verify from "./pages/Verify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/exporter" element={<Exporter />} />
        <Route path="/qa" element={<QA />} />
        <Route path="/certificate" element={<Cert />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
