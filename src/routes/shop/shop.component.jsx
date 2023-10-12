import { useContext } from 'react';
import { ProductContext } from '../../context/product.context.jsx';

import Product from '../../components/product/product.component.jsx';


const Shop = () => { 
    const { products } = useContext(ProductContext);
    return (
        <>
            {
                products.map((data) => {
                    return (
                        <div className="product-category" key={data.id}>
                            <h1> { data.title } </h1>
                                <Product items={data.items}/>                                
                                {
                                    /*
                                    <Product items={data.items}/>
                                    */
                                }
                        
                        </div>
                    )
                })
            }
        </>
    )
}

export default Shop
/*

<Product_list>
Category name
    - Product Card

Category name
    - Product Card

Category name
    - Product Card

Category name
    - Product Card
*/