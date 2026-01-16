import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ADD_TO_CART, decreaseQuantity, increaseQuantity } from '../Redux/Cartslice';
import { useDispatch, useSelector } from 'react-redux'


const ProductDetail = () => {

      const API_URL = import.meta.env.VITE_API_BASE_URL

    const dispatch = useDispatch()
    const { id } = useParams();
    const [product, setproduct] = useState(null);
    const [loading, setloading] = useState(true);


    const cartItems = useSelector(state => state.cart.value)
    const cartItem = cartItems.find(item => item.id === product?.id);

    useEffect(() => {
        async function fetchproduct() {
            const res = await axios.get(`${API_URL}${id}`);
            // console.log(res);

            setproduct(res.data);
            setloading(false);
        }
        fetchproduct()
    }, [id])

    const addToCartHandler = () => {
        dispatch(ADD_TO_CART(product))
    }

    if (loading || !product) {
        return <h1>Loading...</h1>;
    }

    const increaseHandler = () => {
        dispatch(increaseQuantity(product.id));
    };

    const decreaseHandler = () => {
        dispatch(decreaseQuantity(product.id));
    };

    if (!product) {
        return <h1 className="text-center p-10">Loading...</h1>;
    }

    return (
        <div>
            <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-10">

                <img
                    src={product.image}
                    alt={product.title}
                    className="rounded-xl w-full object-cover"
                />

                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <p className="text-2xl font-bold mb-3">${product.price}</p>

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
        </div>
    )
}

export default ProductDetail
