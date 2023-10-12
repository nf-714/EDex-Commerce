import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './checkout-item.styles.scss';

/*
Clicking X Button
    When the user clicks the X button, we want to remove the item from the cart. 
    x button clicked => searchID => removeProductFromCart => updateCartItems

    x button
       a random function call => setCartItem(newFunctionAfterUpdate()) 
       newFunctionAfterUpdate() => filter id => remove from cartItem(need to think)


Incrementing Quantity
    Increment Quantity => searchID => incrementQuantity => updateCartItems

Decrementing Quantity
    Decrement Quantity => searchID => incrementQuantity => updateCartItems
*/

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    
    const { 
        removeProductFromCart, 
        increaseProductQuantity,
        decreaseProductQuantity
     } = useContext(CartContext);

    const clearItemHandler = () => {
        removeProductFromCart(cartItem);
    }
    
    const addItemHandler = () => {
        increaseProductQuantity(cartItem);
    }

    const removeItemHandler = () => {
        decreaseProductQuantity(cartItem);
    }


    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow'  onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'> {price}</span>
            <div className='remove-button'  onClick={clearItemHandler}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;
