import React from 'react'
import { Link } from 'react-router'


const Navbar = () => {
    return (
        <nav className="p-4 shadow flex justify-between">
            <Link to="/" className="font-bold text-xl">MyShop</Link>

            <div className="space-x-4">
                <Link to="/products">Shop</Link>
                <Link to="/cart">Cart</Link>
            </div>
        </nav>
    )
}

export default Navbar
