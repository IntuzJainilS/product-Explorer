import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_FROM_CART, increaseQuantity, decreaseQuantity } from '../Redux/Cartslice';

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.cart.cartItems);
  // console.log(products)
  const removeFromCart = (id) => dispatch(REMOVE_FROM_CART(id));

  const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = products.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const increaseQuantityHandler = (id) => dispatch(increaseQuantity(id));
  const decreaseQuantityHandler = (id) => dispatch(decreaseQuantity(id));

  if (totalQuantity === 0) {
   return <h1>Your cart has no product</h1>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {products.map((product) => (
        <div key={product.id}
          className="flex justify-between items-center border-b py-3">

          <div className="flex gap-4 items-center">
            <img
              src={product.image}
              className="h-16 w-16 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{product.title.slice(0, 15)}</p>
              <p>${product.price}</p>
            </div>
          </div>
          <p>Total quantity: {product.quantity}</p>

          <div className="mt-3 flex items-center gap-3">
            <button className='rounded-lg border px-3 py-1 text-sm font-bold' onClick={() => decreaseQuantityHandler(product.id)}>-</button>
            <span>{product.quantity}</span>
            <button className='rounded-lg border px-3 py-1 text-sm font-bold' onClick={() => increaseQuantityHandler(product.id)}>+</button>
          </div>


          <button onClick={() => removeFromCart(product.id)}>
            Remove from cart
          </button>
        </div>
      ))}

      <div className=''>
        <p>Total products : {totalQuantity}</p>
        <p>Total price : ${totalPrice}</p>
      </div>

    </div>
  )
}

export default Cart
