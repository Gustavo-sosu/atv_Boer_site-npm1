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
import styles from './Brand.module.css';

const Brand = () => {
  const [brandName, setBrandName] = useState('');
  const [brands, setBrands] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
};

export default Brand;