import { useState, useEffect } from 'react';
import styles from './RegisterShop.module.css';
import { useAuthentication } from '../hooks/useAuthentication'; 

const RegisterShop = () => {

    const [displayNameShop, setDisplayNameShop]=useState('');
    const [displayEmailShop, setEmailShop]  = useState('');
    const [displayPasswordShop, setPasswordShop]  = useState('');
    const [displayConfirmShop, setConfirmShop]  = useState('');
    const [error, setError] = useState('');
    const {createShop, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e)=> {
        e.preventDefault();
        setError("")
 
        const shop = {
            displayNameShop,
            displayEmailShop,
            displayPasswordShop
        }
    
        if (displayPasswordShop !== displayConfirmShop) {
            setError("As senhas precisam ser iguais!")
            return
        }

        const res = await createShop(shop)
    }

    useEffect(() => {
            if (authError){
                setError(authError);
            }
        
    })

    return (
        <div>
            <h2>Cadastre-se para ter Acesso ao Site</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>
                        Nome:
                    </span>
                    <input type="text" name="displayNameShop" required placeholder="Nome da Loja" 
                        value={displayNameShop}
                        onChange={(e) => setDisplayNameShop(e.target.value)}
                     />
                </label>
                <label>
                    <span>
                        E-mail:
                    </span>
                    <input type="email" name="displayEmailShop" required placeholder="E-mail da Loja" 
                         value={displayEmailShop}
                         onChange={(e) => setEmailShop(e.target.value)}
                    />
                </label>
                <label>
                    <span>
                        Senha:
                    </span>
                    <input type="password" name="displayPasswordShop" required placeholder="Senha" 
                        value={displayPasswordShop}
                        onChange={(e) => setPasswordShop(e.target.value)}
                    />
                </label>
                <label>
                    <span>
                        Confirmar Senha:
                    </span>
                    <input type="password" name="displayConfirmShop" required placeholder="Repetir Senha" 
                        value={displayConfirmShop}
                        onChange={(e) => setConfirmShop(e.target.value)}
                    />
                </label>
                {!loading && <button className="btn">Cadastrar Loja</button>}
                {loading &&  <button className="btn" disabled>Aguarde...</button>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}
 
export default RegisterShop