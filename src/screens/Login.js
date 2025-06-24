import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { useAuthentication } from "../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    const user = {
      email,
      password
    };

    const res = await login(email, password);
    if (res) {
      navigate("/painel");
    } else {
      setError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  useEffect(() => {
    document.title = "Conectar-se";
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Entrar</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            <span>E-mail:</span>
            <input
              type="email"
              name="email"
              required
              placeholder="E-mail do usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              required
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </label>
          {!loading && (
            <button className={styles.button}>Entrar</button>
          )}
          {loading && (
            <button className={styles.button} disabled>
              Aguarde...
            </button>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;