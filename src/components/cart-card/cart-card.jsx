const CartCard = ({ key, item }) => {
    console.log("hello from",item)
    return (
        <div key={key}>
            <hr />
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <hr />
        </div>
    )
}

export default CartCard