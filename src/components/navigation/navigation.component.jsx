import { Fragment, useContext, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from "../cart-dropdown/cart-dropdown.component"

import { UserContext } from "../../context/user.context.jsx"
import { CartContext } from '../../context/cart.context.jsx';

import CrwnLogo from '../../assets/crown.svg?react';

import './navigation.styles.scss';
import { signOutUser } from '../../utils/firebase/auth/auth.utils.js';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Navigation = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { cartToggle, setCartToggle } = useContext(CartContext)

  const userReset = () => {
    signOutUser()
    navigate('/sign-in')
    setCurrentUser(null)
  }

  const handleDropDown = () => {
    setCartToggle(!cartToggle)
  }


  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
            currentUser === null ?

              (
                <>
                  <Link className='nav-link' to='/create-account'>
                    Create Account
                  </Link>
                  <Link className='nav-link' to='/sign-in'>
                    Sign in
                  </Link>
                </>

              ) : (
                <>
                  <p className="nav-link">
                    {currentUser.displayName}
                  </p>
                  <button className='nav-link' to='/sign-out' onClick={userReset}>
                    Sign out
                  </button>
                  <button className="cart-btn" onClick={handleDropDown}>
                    <CartIcon />
                  </button>
                  {
                    cartToggle == true ?
                      console.log(1)
                      : <CartDropDown />
                  }
                </>
              )
          }

        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;