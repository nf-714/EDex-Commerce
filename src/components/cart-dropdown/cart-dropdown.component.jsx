import { useContext } from "react"
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { CartContext } from "../../context/cart.context.jsx"

import CartCard from "../cart-card/cart-card.jsx"
import "./cart-dropdown.styles.scss"



const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate();


    const goToCheckout = () => {
        navigate('/checkout')


    }
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.length > 0 ?
                        cartItems.map((item) => {
                            console.log(item)
                            const { id, name, quantity, price } = item
                            return (
                                <div key={id}>
                                    <CartCard key={id} item={item} />
                                </div>
                            )
                        })
                        : <p className='empty-message'>Your cart is empty</p>
                }
            </div>
            <button className="cart-btn" onClick={goToCheckout}>GO TO CHECKOUT</button>
        </div>
    )
}

export default CartDropdown