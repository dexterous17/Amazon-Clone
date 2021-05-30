import React from 'react'
import './StyleSheet/Product.css'
import { useStateValue } from "./Context/StateProvider";
export default function Product({id,title,image,price,rating}) {
    
    const [{basket},dispatch] = useStateValue();
    
    const addToBasket = () =>{
      dispatch(
        {
            type:'ADD_TO_BASKET',
            item:{
                id:id,
                title:title,
                image:image,
                price:price,
                rating:rating
            }
        }
      )
    }

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {
                    Array(rating)
                    .fill()
                    .map((_,i)=>(
                        <span key={Math.random()} role="img" aria-label="star">⭐</span>
                    ))
                    }
                </div>
            </div>
            <img src={image} alt={image}/>       
            <button onClick={addToBasket}>Add To Basket</button>
        </div>
    )
}
