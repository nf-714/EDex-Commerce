import { useState, useEffect, createContext, useReducer } from 'react';


const CART_ACTION_TYPES = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    INCREASE_QUANTITY: 'INCREASE_QUANTITY',
    DECREASE_QUANTITY: 'DECREASE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    TOGGLE_CART: 'TOGGLE_CART',
    COUNT_CART: 'COUNT_CART',
    TOTAL_CART: 'TOTAL_CART',
}

const INITIAL_STATE = {
    cartItems: [],
    cartTotal: 0,
    cartCount: 0,
    cartToggle: true,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    //state = initial state
    //type = triggering action type name
    //payload = data that we want to update
    switch (type) {
        case CART_ACTION_TYPES.TOGGLE_CART:
            return {
                ...state,
                cartToggle: !state.cartToggle
            }

        case CART_ACTION_TYPES.ADD_ITEM:
            return {
                ...state,
                cartItems: addCartItem(state.cartItems, payload)
            }

        case CART_ACTION_TYPES.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeProduct(state.cartItems, payload)
            }

        case CART_ACTION_TYPES.INCREASE_QUANTITY:
            return {
                ...state,
                cartItems: increaseQuantity(state.cartItems, payload)
            }

        case CART_ACTION_TYPES.DECREASE_QUANTITY:
            return {
                ...state,
                cartItems: decreaseQuantity(state.cartItems, payload)
            }

        case CART_ACTION_TYPES.COUNT_CART:
            return {
                ...state,
                cartCount: state.cartItems.reduce((total, items) => total + items.quantity, 0)
            }

        case CART_ACTION_TYPES.TOTAL_CART:
            return {
                ...state,
                cartTotal: state.cartItems.reduce((total, items) => total + items.quantity * items.price, 0)
            }

        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

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
    /*
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [cartToggle, setCartToggle] = useState(true);
    */
/*
    useEffect(() => {
        const newCartTotal = state.cartItems.reduce(
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
   */
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    useEffect(() => {
        dispatch({
            type: CART_ACTION_TYPES.COUNT_CART,
        })
      }, [state.cartItems]);


    useEffect(() => {
        dispatch({
            type: CART_ACTION_TYPES.TOTAL_CART,
        })
    }, [state.cartItems]);

    const addItemToCart = (product) => {
        dispatch({
            type: CART_ACTION_TYPES.ADD_ITEM,
            payload: product
        })
        //setCartItems(addCartItem(cartItems, product))
    }

    const removeProductFromCart = (product) => {
        dispatch({
            type: CART_ACTION_TYPES.REMOVE_ITEM,
            payload: product
        })
        //setCartItems(removeProduct(cartItems, product))
    }

    const increaseProductQuantity = (product) => {
        dispatch({
            type: CART_ACTION_TYPES.INCREASE_QUANTITY,
            payload: product
        })
        //setCartItems(increaseQuantity(cartItems, product))
    }

    const decreaseProductQuantity = (product) => {
        dispatch({
            type: CART_ACTION_TYPES.DECREASE_QUANTITY,
            payload: product
        })
        //setCartItems(decreaseQuantity(cartItems, product))
    }

    const isCartActive = () => {
        dispatch({
            type: CART_ACTION_TYPES.TOGGLE_CART,
        })
        //setCartToggle(!cartToggle)
    }
    console.log(state.cartItems)
    const { cartItems, cartTotal, cartCount, cartToggle } = state;
    const value = {
        cartItems,
        cartTotal,
        cartCount,
        cartToggle,
        isCartActive,
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



