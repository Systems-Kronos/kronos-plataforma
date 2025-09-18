import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home/Home';
import Analises from './pages/Analises/Analises';
import Membros from './pages/Membros/Membros';
import Reports from './pages/Reports/Reports';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/analises'  element={<Analises />} />
        <Route path='/membros-equipe'  element={<Membros />} />
        <Route path='/reports'  element={<Reports />} />
      </Routes>
    </Router>
  )
}

export default App
