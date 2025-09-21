import "./style.css";

export default function CardInformacoes({ titulo, icone, numero, descricao }) {
  return (
    <div className="card-informacoes">
      <div className="header-card-informacoes">
        <h2>{titulo}</h2>
        <div className="icone">{icone}</div>
      </div>

      <div className="body-card-informacoes">
        <h1>{numero}</h1>
        <p>{descricao}</p>
      </div>
    </div>
  );
}
