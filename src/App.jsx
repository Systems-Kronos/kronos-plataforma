import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Noticias from "./pages/Noticias/Noticias";
import Equipe from "./pages/Equipe/Equipe";
import Reports from "./pages/Reports/Reports";
import Tarefas from "./pages/Tarefas/Tarefas";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/tarefas" element={<Tarefas />} />
        </Route>
      </Routes>
    </Router>
  );
}
