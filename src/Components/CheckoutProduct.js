import React from 'react'
import "../StyleSheet/CheckoutProduct.css"
import { useStateValue } from "../Context/StateProvider";

export default function CheckoutProduct({id,image,title,price,rating, hideButton}) {
    const [{ basket }, dispatch] = useStateValue();

    
    const removefromBasket = () =>{
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    
    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>🌟</p>
                    ))}
                </div>
                {!hideButton && (
                    <button onClick={removefromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
}
