import "./style.css";

export default function Button({ texto, onClick, variant }) {
    return (
        <button
            className={`btn ${variant} ${onClick ? "clicavel" : "nao-clicavel"}`}
            type="button"
            onClick={onClick}
            disabled={!onClick}
        >
            {texto}
        </button>
    );
}