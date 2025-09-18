import "./style.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Analises() {
  const navigate = useNavigate();

  return (
    <div className="box-container">
      <div className="header-container">
        <ArrowBackIosIcon style={{ color: "#E6B648", fontSize: 30, cursor: "pointer" }} onClick={() => navigate("/")} />
        <h1>Análises e Estatísticas</h1>
      </div>
    </div>
  );
};
