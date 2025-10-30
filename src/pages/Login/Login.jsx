import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/";
import { login } from "../../service/login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import { validarCPF } from "../../utils/validacaoRegex";

export default function Login() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ mensagem: "", tipo: "" });

  const handleCpfChange = (evento) => {
    let value = evento.target.value;

    value = value.replace(/\D/g, "");
    value = value.slice(0, 11);

    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    setCpf(value);
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setAlerta({ mensagem: "", tipo: "" });

    if (!validarCPF(cpf)) {
      setAlerta({
        id: Date.now(),
        mensagem: "CPF inválido. Verifique e tente novamente.",
        tipo: "erro",
      });
      return;
    }

    if (!senha.trim()) {
      setAlerta({
        id: Date.now(),
        mensagem: "A senha não pode estar vazia.",
        tipo: "erro",
      });
      return;
    }

    setLoading(true);

    try {
      await login(cpf.trim(), senha.trim());

      setAlerta({
        id: Date.now(),
        mensagem: "Login realizado com sucesso!",
        tipo: "sucesso",
      });
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      setAlerta({
        id: Date.now(),
        mensagem: error.message,
        tipo: "erro",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.boxContainer}>
      {loading && <Loading />}

      {alerta.mensagem && (
        <Alert key={alerta.id} mensagem={alerta.mensagem} tipo={alerta.tipo} />
      )}

      <div className={styles.boxContainerLeft}>
        <h1>
          Seja bem-vindo à<br /> área do gestor!
        </h1>
        <p>
          Gerencie sua equipe de forma rápida e prática e tenha acesso a
          análises em tempo real
        </p>
      </div>

      <div className={styles.boxContainerRight}>
        <div className={styles.formContainer}>
          <h2>Login</h2>

          <form className={styles.form}>
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              placeholder="000.000.000-00"
              onChange={handleCpfChange}
              required
            />

            <label htmlFor="password">Senha</label>
            <div className={styles.passwordContainer}>
              <input
                type={mostrarSenha ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Digite sua senha"
                onChange={(evento) => setSenha(evento.target.value)}
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
          </form>

          <div className={styles.buttonWrapper}>
            <Button
              texto={"Entrar"}
              variant={"primario"}
              className={styles.loginButton}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
