import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/connection';
import styles from './Brand.module.css'; // Ou crie um Products.module.css

const Products = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brandId, setBrandId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Buscar marcas cadastradas
  useEffect(() => {
    const brandCollection = collection(db, 'brands');
    const q = query(brandCollection, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBrands(list);
    });
    return () => unsubscribe();
  }, []);

  // Buscar produtos cadastrados
  useEffect(() => {
    const productCollection = collection(db, 'products');
    const q = query(productCollection, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(list);
    });
    return () => unsubscribe();
  }, []);

  // Submeter novo produto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price.trim() || !brandId) {
      setMessage('Preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        name,
        price: parseFloat(price),
        brandId,
        createdAt: Timestamp.now(),
      });
      setMessage('Produto cadastrado com sucesso!');
      setName('');
      setPrice('');
      setBrandId('');
    } catch (error) {
      setMessage('Erro ao cadastrar produto.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Função para pegar o nome da marca pelo id
  const getBrandName = (id) => {
    const brand = brands.find((b) => b.id === id);
    return brand ? brand.name : 'Marca não encontrada';
  };

  return (
    <div className={styles.formWrapper}>
      <h2><center>Cadastrar Produto</center></h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome do produto"
          />
        </label>
        <label>
          Preço:
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Preço"
            min="0"
            step="0.01"
          />
        </label>
        <label>
          Marca:
          <select
            value={brandId}
            onChange={e => setBrandId(e.target.value)}
          >
            <option value="">Selecione uma marca</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
      </form>
      {message && <p>{message}</p>}

      <h3 style={{marginTop: '2rem'}}>Produtos cadastrados</h3>
      <ul className={styles.list}>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong> — R$ {product.price.toFixed(2)}<br />
            <small>Marca: {getBrandName(product.brandId)}</small>
          </li>
        ))}
        {products.length === 0 && <li>Nenhum produto cadastrado.</li>}
      </ul>
    </div>
  );
};

export default Products;