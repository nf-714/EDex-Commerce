//import Card from "./card.component.jsx"

import "./product-card.styles.scss"

import { useContext }   from "react"

import { UserContext } from "../../context/user.context.jsx"
import { CartContext } from "../../context/cart.context.jsx"

const Product_card = ({ items }) => {
    const {
        id,
        name,
        price,
        imageUrl
    } = items

    const { addItemToCart } = useContext(CartContext)
    const addToCart = () => {
        addItemToCart(items)
    }


    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <button onClick={addToCart}>
                Add to card
            </button>
        </div>
    )
}

export default Product_card