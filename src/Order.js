import React from 'react'
import "./StyleSheet/Order.css"
import moment from "moment"
import CheckoutProduct from "./Components/CheckoutProduct"
import CurrencyFormat from "react-currency-format"
function Order({order}) {
    return (
        <div className="order">
            <h2>Order</h2>
            <h1>Your Orders</h1>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {
                order.data.basket?.map(
                    item=>(
                        <CheckoutProduct 
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        hideButton
                        > </CheckoutProduct>
                    )
                )
            }
            
            <CurrencyFormat
            renderText={(value)=>(
                
                <p>
                    <h3 className="order__total">Order Total: {value}</h3>                    
                </p>
                
            )}
            decimalScale={2}
            value={ order.data.amount/100 }
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            />

        </div>
    )
}

export default Order
