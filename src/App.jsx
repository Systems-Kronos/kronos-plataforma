import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Analises from "./pages/Analises/Analises";
import Membros from "./pages/Membros/Membros";
import Reports from "./pages/Reports/Reports";
import Tarefas from "./pages/Tarefas/Tarefas";

export default function App() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("empresaId");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/analises" element={<Analises />} />
          <Route path="/membros-equipe" element={<Membros />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/tarefas" element={<Tarefas />} />
        </Route>
      </Routes>
    </Router>
  );
}
