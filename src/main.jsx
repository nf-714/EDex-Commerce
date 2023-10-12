import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import Navigation from './components/navigation/navigation.component.jsx';
import Shop from './routes/shop/shop.component.jsx';

import { UserProvider } from './context/user.context.jsx'
import { ProductProvider } from './context/product.context.jsx'
import { CartProvider } from './context/cart.context.jsx'

import Error from './routes/error/error.component.jsx';
import SignIn from './routes/signin-page/signin-page.component.jsx';
import SignUp from './routes/signup-page/signup-page.component.jsx';
import Checkout from './routes/checkout/checkout.component.jsx';
import './index.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/create-account",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </React.StrictMode>,
)
