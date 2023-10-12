import Product_card from "../product-card/product-card.component"

import "./product.styles.scss"

const Product = ({items}) => {
    return(
        <div className="product-container">
            {
                items.map((item) => {
                    return (
                        <div className="product" key={item.id}>
                            <Product_card items={item}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Product