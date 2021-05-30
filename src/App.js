import React,{ useEffect } from 'react';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Checkout from './View/Checkout'
import {auth} from "./firebase"
import {useStateValue} from "./Context/StateProvider"
import Payment from "./Payment"
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import Orders from "./Orders"



const promise = loadStripe(
  "pk_test_51Hps8SLAex9slWfOAXlFNdVr9OI4efh6l2dFkDuC6e4Ej8LymHmcdaCDmoQI7IR8fQ4IPK19arTEc9TB2n9HoiUC00HkRgo5Z6"
)

function App() {

  const [{},dispatch] = useStateValue();

  useEffect(() => {
    
    auth.onAuthStateChanged(authUser =>{
      if(authUser){
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      }else{
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div>
      <Switch>
        <Route path="/orders">
          <Header></Header>
          <Orders></Orders>
        </Route>  
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/checkout">
        <Header/>
          <Checkout></Checkout>
        </Route>
        <Route path="/payment">
          <Header></Header>
          <Elements stripe={promise}>
            <Payment></Payment>
          </Elements>
        </Route>
        <Route path="/">
          <Header/>
          <Home/>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
