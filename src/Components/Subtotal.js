import React from 'react'
import "../StyleSheet/Subtotal.css"
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../Context/StateProvider";
import {getBasketTotal } from "../Reducers/Reducer";
import { useHistory } from 'react-router-dom';

export default function Subtotal() {
    const history = useHistory()
    const [{ basket,user}, dispatch] = useStateValue();
    
    const checklogin = event =>{
        event.preventDefault();
        if(!user){
            history.push('/login')
        }else if(!basket.length){
            history.push('/')
        }else{
            history.push('/payment')
        }
    }


    return (
        <div className="subtotal">
            <CurrencyFormat
            renderText={(value)=>(
                <>
                <p>
                    Subtotal( {basket?.length} items):<strong>{value}</strong>                    
                </p>
                <small className="subtotal__gift">
                <input type="checkbox"/> This order contains a gift
                </small>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)} // Part of the homework
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            />
            <button onClick={checklogin}>Proceed to Checkout</button>
        </div>
    )
}
