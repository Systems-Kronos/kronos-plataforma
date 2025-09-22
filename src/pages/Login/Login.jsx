import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/";

export default function Login() {
  const navigate = useNavigate();

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
            <label htmlFor="cpfemail">CPF:</label>
            <input
              type="cpf"
              id="cpf"
              name="cpf"
              placeholder="Digite seu CPF"
              required
            />

            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              required
            />
          </form>

          <div className={styles.buttonWrapper}>
            <Button
              texto={"Entrar"}
              variant={"primario"}
              onClick={() => navigate("/")}
              className={styles.loginButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
