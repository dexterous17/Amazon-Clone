import React,{useState, useEffect} from 'react'
import "./StyleSheet/Payment.css"
import {useStateValue} from "./Context/StateProvider" 
import CheckoutProduct from './Components/CheckoutProduct';
import {Link,useHistory} from "react-router-dom"
import { CardElement, useStripe,useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format"
import {getBasketTotal} from "./Reducers/Reducer"
import axios from "./axios"
import { db } from "./firebase";
function Payment() {
const [{basket,user} , dispatch] = useStateValue();

const stripe = useStripe();
const elements = useElements();

const [succeeded,setSucceeeded] = useState(false);
const [processing,setProcessing] = useState("");
const [error,setError] = useState(null);
const [disabled,setDisabled] = useState(true);
const [clientSecret, SetClinetSecret] = useState(true);
const history = useHistory()

useEffect(() => {
    const getClientSecret = async() =>{
        const response = await axios ({
            method:"post",
            url: `/payment/create?total=${Math.round(getBasketTotal(basket) * 100)}`
        });
        SetClinetSecret(response.data.clientSecret);
    } 
    getClientSecret()
}, [basket])


const handlesubmit = async (event) =>{
    event.preventDefault();
    setProcessing(true)
    
    const payload = await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card:elements.getElement(CardElement)
        }
    
    }).then(({paymentIntent})=>{
        
        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
            basket:basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
        })

        setSucceeeded(true)
        setError(null)
        setProcessing(false)
        dispatch({
            type:'EMPTY_BASKET'
        })
        history.replace('/orders')
        
    })
}

const handlechange = event =>{
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "")
}

return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout(
                    <Link to="/checkout">{basket?.length} item</Link>
                    )
                </h1>

                <div className="payment__section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className="payment__section">
                <div className="payment_title">
                        <h3>Review items and delivery</h3>
                </div>
                <div className="payment__item">
                    {
                        basket.map(item=>(
                            <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            />
                        ))
                    }
                </div>
                </div>
                <div className="payment__section">
                        <div className="payment__title">
                            <h3>Credit card</h3>
                        </div>
                        <div className="payment__details">
                            <form onSubmit={handlesubmit}>
                                <CardElement onChange={handlechange}></CardElement>
                                <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value)=>(
                                        
                                            <p>
                                        <h3>Order Total:{value}</h3>                    
                                            </p>
                                       
                                    
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} // Part of the homework
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button
                                disabled={processing || disabled || succeeded}
                                    ><span>{processing ? <p>Processing</p> : "Buy Now"}</span></button>
                                </div>
                                    {error && <div>{error}</div>}
                            </form>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
