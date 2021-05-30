import React,{useEffect} from 'react'
import './StyleSheet/Header.css'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link,useHistory} from "react-router-dom"
import { useStateValue } from './Context/StateProvider';
import { auth } from './firebase';
export default function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    const handleAuthentication = () => {
        if(user){
            auth.signOut();
        }
    }

    useEffect(() => {
        
        if(!user){
            history.push('/')
        }
        
    }, [user])

    return (
        <div className='header'>
            <Link to="/">
            <img className="header__logo" src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt="Amazon"></img>
            </Link>
            
            <div className="header__search">
                <input
                className="header__searchInput"
                type="text"
                />
                <SearchIcon className="header__searchIcon"/>
            </div>
            <div className="header__nav">
                <Link to={!user && "/login"}>
                    <div 
                    onClick={handleAuthentication}
                    className="header__option">
                        <span className='header__optionLineone'>{user ? user?.email : "Hello Guest" }</span>
                        <span className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                <Link to={ user ? "/orders" : "/login"}>
                    <div className="header__option">
                        <span className='header__optionLineone'>Return</span>
                        <span className='header__optionLineTwo'>& Orders</span>
                    </div>
                </Link>
                    <div className="header__option">
                        <span className='header__optionLineone'>Your</span>
                        <span className='header__optionLineTwo'>Prime</span>
                    </div>
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon/>
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>           
        </div>
    )
}