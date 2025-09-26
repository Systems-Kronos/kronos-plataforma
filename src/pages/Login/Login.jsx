import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/";
import { login } from "../../service/login";

export default function Login() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

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

    try {
      const usuario = await login(cpf.trim(), senha.trim());
      console.log("CPF enviado:", `"${cpf}"`);
      console.log("Senha enviada:", `"${senha}"`);
      
      if (usuario?.token) {
        console.log("Usuário logado:", usuario);
        localStorage.setItem("token", usuario.token);
      }

      navigate("/");
      alert("Login realizado com sucesso!");
    } catch {
      alert("CPF ou senha incorretos!");
    }
  };

  return (
    <div className={styles.boxContainer}>
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
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              onChange={(evento) => setSenha(evento.target.value)}
              required
            />
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
