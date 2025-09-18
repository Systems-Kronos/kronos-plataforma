import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home/Home';
import Membros from './pages/Membros/Membros';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/membros-equipe'  element={<Membros />} />
      </Routes>
    </Router>
  )
}

export default App
