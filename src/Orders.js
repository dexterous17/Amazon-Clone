import React, { useEffect } from 'react'
import './StyleSheet/Orders.css'
import {db} from "./firebase"
import { useState } from 'react'
import { useStateValue } from './Context/StateProvider'
import Order from "./Order"

function Orders() {
    const [{ basket, user,order_switch }, dispatch] = useStateValue();
    const [orders,setOrders] = useState([])
    

    useEffect(()=>{
        if(user && !order_switch){
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created','desc')
            .limit(1)
            .onSnapshot(snapshot =>{
                setOrders(snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data()
                })))
            })  
        }else {setOrders([])}  
        
    },[user])
    
    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className="orders__order">
                {orders?.map(order=>(
                        <Order order={order}/>
                ))}
            </div>
        </div>
    )
}

export default Orders
