import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
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
  const [unit, setUnit] = useState('');
  const [brandId, setBrandId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

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

  // Submeter novo produto ou editar
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price.trim() || !brandId || !unit.trim()) {
      setMessage('Preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      if (editId) {
        // Editar produto
        const productRef = doc(db, 'products', editId);
        await updateDoc(productRef, {
          name,
          price: parseFloat(price),
          brandId,
          unit: parseInt(unit, 10),
        });
        setMessage('Produto atualizado com sucesso!');
      } else {
        // Novo produto
        await addDoc(collection(db, 'products'), {
          name,
          price: parseFloat(price),
          brandId,
          unit: parseInt(unit, 10),
          createdAt: Timestamp.now(),
        });
        setMessage('Produto cadastrado com sucesso!');
      }
      setName('');
      setPrice('');
      setUnit('');
      setBrandId('');
      setEditId(null);
    } catch (error) {
      setMessage('Erro ao salvar produto.');
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

  // Editar produto
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setUnit(product.unit ? product.unit.toString() : '');
    setBrandId(product.brandId);
  };

  // Apagar produto
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja apagar este produto?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        setMessage('Produto apagado!');
        setTimeout(() => setMessage(''), 2000);
      } catch (error) {
        setMessage('Erro ao apagar produto.');
      }
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2><center>{editId ? 'Editar Produto' : 'Cadastrar Produto'}</center></h2>
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
          Unidade:
          <input
            type="number"
            value={unit}
            onChange={e => setUnit(e.target.value)}
            placeholder="Quantidade"
            min="0"
            step="1"
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
          {loading ? 'Salvando...' : editId ? 'Salvar Alterações' : 'Cadastrar'}
        </button>
        {editId && (
          <button
            type="button"
            className={styles.btn}
            style={{ background: '#ccc', color: '#222', marginLeft: 10 }}
            onClick={() => {
              setEditId(null);
              setName('');
              setPrice('');
              setUnit('');
              setBrandId('');
            }}
          >
            Cancelar
          </button>
        )}
      </form>
      {message && <p>{message}</p>}

      <h3 style={{marginTop: '2rem'}}>Produtos cadastrados</h3>
      <ul className={styles.list}>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong> — R$ {Number(product.price).toFixed(2)}<br />
            <small>Unidade: {product.unit || '-'}</small><br />
            <small>Marca: {getBrandName(product.brandId)}</small>
            <br />
            <button
              className={styles.btn}
              style={{ background: '#f0ad4e', color: '#222', marginRight: 8, marginTop: 8 }}
              onClick={() => handleEdit(product)}
            >
              Editar
            </button>
            <button
              className={styles.btn}
              style={{ background: '#d9534f', color: '#fff', marginTop: 8 }}
              onClick={() => handleDelete(product.id)}
            >
              Apagar
            </button>
          </li>
        ))}
        {products.length === 0 && <li>Nenhum produto cadastrado.</li>}
      </ul>
    </div>
  );
};

export default Products;