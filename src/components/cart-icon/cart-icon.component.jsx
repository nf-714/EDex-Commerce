import "./cart-icon.styles.scss"

import ShoppingIcon from '../../assets/shopping-bag.svg?react';

import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';


const CartIcon = () => {

    const { cartCount } = useContext(CartContext);

    return (
        <>
            <div className='cart-icon-container'>
                <ShoppingIcon className='.shopping-icon' />
                <span className='item-count'>{cartCount}</span>
            </div>
        </>

    )
}

export default CartIcon