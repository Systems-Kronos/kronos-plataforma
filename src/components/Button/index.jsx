import "./style.css";

export default function Button({ text, onClick, variant="primario" }) {
  return (
        <button className={`btn ${variant}`} type="button" onClick={onClick}>
            {text}
        </button>
    );
}