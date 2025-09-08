import "./style.css";

export default function Button({ text, onClick=undefined, variant }) {
  return (
        <button className={`btn ${variant} ${onClick ? "clicavel" : "nao-clicavel"}`} type="button" onClick={onClick}>
            {text}
        </button>
    );
}