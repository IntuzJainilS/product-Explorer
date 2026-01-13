import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router';
import Productcard from './Productcard';

const ProductList = () => {

  const API_URL = import.meta.env.VITE_API_BASE_URL
  console.log(API_URL);

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  

  const [product, setproduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, seterr] = useState(null)

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(API_URL)
        setproduct(response.data);
        console.log(response);
        setLoading(false)
      } catch (error) {
        console.error("Fetch error:", error);
        seterr(error);
      }
    }
    fetchedData();
  }, [])

  return (
    <>
      <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Our Products</h1>

      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {product.map(product => (
          <Productcard key={product.id} product={product} />
        ))}

      </div>
    </>
  )
}

export default ProductList
