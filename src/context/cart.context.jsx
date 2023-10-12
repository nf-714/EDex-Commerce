import { useState, useEffect,createContext } from 'react';

export const CartContext = createContext({
    cartItems: null,
    cartToggle: null,
    cartTotal: null,
    cartCount: null,
    setCartTotal: () => null,
    setCartItems: () => null,
    addItemToCart: () => null,
    setCartToggle: () => null,
    removeProductFromCart: () => null,
    increaseQuantity: () => null,
    decreaseQuantity: () => null,
});


const addCartItem = (cartItems, product) => {
    const findProduct = cartItems.filter(items => {
        return items.id == product.id
    })

    if (findProduct.length > 0) {
        return cartItems.map(items => {
            if (items.id === product.id) {
                return {
                    ...items,
                    quantity: items.quantity += 1
                }
            }
            else {
                return items
            }
        })
    }
    else {
        return [
            ...cartItems,
            {
                ...product,
                quantity: 1
            }
        ]
    }
}

const removeProduct = (cartItems, product) => {
    const findProduct = cartItems.filter(items => {
        return items.id !== product.id
    })

    return findProduct
}
//Set the total_price 
//set increment
//set decrement
//donne
const increaseQuantity = (cartItems, product) => {
    /* 
        find id
           increate the quantity to 1
           increase the price  x quantity
           return updated cartItems  
        
    */
    const findProduct = cartItems.filter(items => {
        return items.id !== product.id
    })

    if (findProduct.length > 0) {
        return cartItems.map(items => {
            if (items.id === product.id) {
                return {
                    ...items,
                    quantity: items.quantity += 1
                }
            }
            else {
                return items
            }
        })
    }

    else {
        return cartItems
    }

}

const decreaseQuantity = (cartItems, product) => {

    const findProduct = cartItems.filter(items => {
        return items.id !== product.id
    })

    if (findProduct.length > 0) {
        return cartItems.map(items => {
            if (items.id === product.id) {
                return {
                    ...items,
                    quantity: items.quantity == 1 ? items.quantity = 1 : items.quantity -= 1
                }
            }
            else {
                return items
            }
        })
    }

    else {
        return cartItems
    }
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]); // [ {item, quantity} ]
    const [cartTotal, setCartTotal] = useState(0);
    const [cartToggle, setCartToggle] = useState(true);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
          (total, items) => total + items.quantity * items.price,
          0
        );
        setCartTotal(newCartTotal);
      }, [cartItems]);


      useEffect(() => {
        const newCartCount = cartItems.reduce(
          (total, items) => total + items.quantity,
          0
        );
        setCartCount(newCartCount);
      }, [cartItems]);
    

    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product))
    }

    const removeProductFromCart = (product) => {
        setCartItems(removeProduct(cartItems, product))
    }

    const increaseProductQuantity = (product) => {
        setCartItems(increaseQuantity(cartItems, product))
    }

    const decreaseProductQuantity = (product) => {
        setCartItems(decreaseQuantity(cartItems, product))
    }

    const value = {
        cartItems,
        setCartItems,
        cartTotal,
        cartCount,
        setCartTotal,
        cartToggle,
        setCartToggle,
        addItemToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}



