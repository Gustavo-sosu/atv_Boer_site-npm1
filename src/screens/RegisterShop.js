import { useState, useEffect } from 'react';
import styles from './RegisterShop.module.css';
import { useAuthentication } from '../hooks/useAuthentication'; 

const RegisterShop = () => {

    const [displayNameShop, setDisplayNameShop]=useState('');
    const [displayEnderecoShop, setEnderecoShop]  = useState('');
    const [displayCidadeShop, setCidadeShop]  = useState('');
    const [displayUFShop, setUFShop]  = useState('');
    const {createShop, loading} = useAuthentication();

    const handleSubmit = async (e)=> {
        e.preventDefault();
 
        const shop = {
            displayNameShop,
            displayEnderecoShop: displayEnderecoShop,
            displayCidadeShop: displayCidadeShop,
            displayUFShop: displayUFShop,
        }
    

        const res = await createShop(shop)
    }



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
                        Endereço:
                    </span>
                    <input type="text" name="displayEnderecoShop" required placeholder="Endereço da Loja" 
                         value={displayEnderecoShop}
                         onChange={(e) => setEnderecoShop(e.target.value)}
                    />
                </label>
                <label>
                    <span>
                        Cidade:
                    </span>
                    <input type="text" name="displayCidadeShop" required placeholder="Cidade da Loja" 
                        value={displayCidadeShop}
                        onChange={(e) => setCidadeShop(e.target.value)}
                    />
                </label>
                <label>
                    <span>
                        UF:
                    </span>
                    <input type="text" name="displayUFShop" required placeholder="UF:" 
                        value={displayUFShop}
                        onChange={(e) => setUFShop(e.target.value)}
                    />
                </label>
                {!loading && <button className="btn">Cadastrar Loja</button>}
                {loading &&  <button className="btn" disabled>Aguarde...</button>}
                <p>Já possui uma Loja cadastrada? <a href="">Logue aqui</a></p>
            </form>
        </div>
    )
}
 
export default RegisterShop