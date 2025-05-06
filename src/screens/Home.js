import React from "react";
import styles from './Home.module.css';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className={styles.container}>
            <section className={styles.intro}>
                <h1>BuyTure</h1>
                <p>Explore opções diversas para encontrar aquilo que deseja.</p>
                <Link to={"/about"}>
                    <button>Saiba Mais</button>
                </Link>
            </section>
            <section className={styles.cards}>
                <div className={`${styles.card} ${styles.top}`}>
                    <h2>Compra & Pedido</h2>
                    <p>Produtos revendidos de diversos locais do mundo.</p>
                </div>
                <div className={styles.card}>
                    <h2>Revenda</h2>
                    <p>Venda aqui itens e equipamentos que ja não precisa!! É necessario estar em boas condições.</p>
                </div>
            </section>
        </main>
    );
};

export default Home;