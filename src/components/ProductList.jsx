import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Productcard from './Productcard';
import api_url from '../utils/EnvVariables'

const ProductList = () => {

  const API_URL = api_url;
  // console.log(API_URL);

  // const api = axios.create({
  //   baseURL: API_URL,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  
  const [product, setproduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, seterr] = useState(false)
  const[currentPage, setcurrentPage] = useState(1)

  const productsPerPage = 4;

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(API_URL)
        setproduct(response.data);
        // console.log(response);
        setLoading(false)
      } catch (error) {
        console.error("There is an error while fetching products:", error);
        seterr(error);
      }
    }
    fetchedData();
  }, [])

    const indexOfLast = currentPage * productsPerPage;
    const indexoffirst = indexOfLast - productsPerPage

    const currentProducts = product.slice(indexoffirst, indexOfLast) 

    const totalpages = Math.ceil(product.length / productsPerPage)


  return (
    <>
      <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Our Products</h1>

      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {currentProducts.map(product => (
          <Productcard key={product.id} product={product} />
        ))}

      </div>

      {/* pagination  */}
       <div className="flex justify-center items-center gap-4 my-6">

        <button
          disabled={currentPage === 1}
          onClick={() => setcurrentPage(prev => prev - 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {currentPage} of {totalpages}</span>

        <button
          disabled={currentPage === totalpages}
          onClick={() => setcurrentPage(prev => prev + 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </>
  )
}

export default ProductList
