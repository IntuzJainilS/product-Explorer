import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Home from './components/Home'
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>

    </>
  )
}

export default App
