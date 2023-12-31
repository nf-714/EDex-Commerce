import { useState, createContext } from 'react';

import { SHOP_DATA } from '../shop-data';

export const ProductContext = createContext({
    setProducts: () => null,
    products: [],
});

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(SHOP_DATA);
    const value = { products, setProducts };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

