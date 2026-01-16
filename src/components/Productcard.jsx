import React from 'react';
import { Link } from 'react-router';
import { ADD_TO_CART, decreaseQuantity, increaseQuantity } from '../Redux/Cartslice';
import { useDispatch, useSelector } from 'react-redux'


const Productcard = ({ product }) => {
  const dispatch = useDispatch()

  const cartItems = useSelector(state => state.cart.value)

  const cartItem = cartItems.find(item => item.id === product.id);
  // console.log("cart includes these products",cartItem)


  const addToCartHandler = () => {
    dispatch(ADD_TO_CART(product))
  }

  const increaseHandler = () => {
    dispatch(increaseQuantity(product.id));
  };

  const decreaseHandler = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className=" h-60 w-60 aspect-square overflow-hidden bg-gray-100 group-hover:opacity-90 transition-opacity ml-18">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105 p-4"
        />
      </div>

      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex flex-col pt-2">
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
          <Link to={`/products/${product.id}`}>
            <p className="text-xs text-blue-600 font-medium group-hover:underline">
              View Details &rarr;
            </p>
          </Link>

        </div>
        {!cartItem ? (
          <button
            onClick={addToCartHandler}
            className="mt-3 rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Add to Cart
          </button>
        ) : (
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={decreaseHandler}
              className="rounded-lg border px-3 py-1 text-sm font-bold"
            >
              -
            </button>

            <span className="font-semibold">{cartItem.quantity}</span>

            <button
              onClick={increaseHandler}
              className="rounded-lg border px-3 py-1 text-sm font-bold"
            >
              +
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Productcard;