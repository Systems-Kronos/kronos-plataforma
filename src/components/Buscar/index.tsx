import "./style.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Buscar({ placeholder = "Buscar", onChange }) {
  return (
    <div className="buscar-container">
      <SearchIcon className="buscar-icone" />
      <input
        type="text"
        placeholder={placeholder}
        className="buscar-input"
        onChange={onChange}
      />
    </div>
  );
}
