import React from 'react'
import '../StyleSheet/Checkout.css'
import Subtotal from '../Components/Subtotal'
import { useStateValue } from "../Context/StateProvider";
import CheckoutProduct from '../Components/CheckoutProduct';

export default function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();
    
    return (
        <div className="checkout">
             <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Add"
        />
        <h2 className="checkout__title">
            Your Shopping Basket
        </h2>
        {basket.map(item =>(
              <CheckoutProduct id={item.id} image={item.image} title={item.title} price={item.price} rating = {item.rating} />
          ))}
            </div>
            <div className="checkout__right">
                <Subtotal></Subtotal>
            </div>
        </div>
    )
}
