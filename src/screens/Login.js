import React from "react";
import styles from './Login.module.css';
const Login = () => {


    return (
        <div>
            <h2>Realize seu Login</h2>
            <form>
                <label>
                    <span>
                        Nome:
                    </span>
                    <input type="text" name="displayName" required placeholder="Nome do Usuário" />
                </label>
                <label>
                    <span>
                        Senha:
                    </span>
                    <input type="password" name="displayName" required placeholder="Senha" />
                </label>
                 <button className="btnLogar">
                    Logar
                </button>
            </form>
        </div>
    )
}
 
export default Login