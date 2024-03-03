import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './Componant/Navbar/Navbar';
import Footer from './Componant/Footer/Footer';
import MainSlider from './Componant/MainSlider/MainSlider';
import Home from './Componant/Home/Home';
import MainLayout from './Componant/MainLayout/MainLayout';
import Cart from './Componant/Cart/Cart'
import Products from './Componant/Products/Products'
import Categories from './Componant/Categories/Categories'
import Brands from './Componant/Brands/Brands'
import NotFound from './Componant/NotFound/NotFound';
import WishList from './Componant/WishList/WishList';
import AuthLayout from './Componant/AuthLayout/AuthLayout';
import SignIn from './Componant/SingIn/SignIn';
import SignUp from './Componant/SignUP/SignUp';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './Componant/ProductDetails/ProductDetails';
import WishListContextProvider from './Context/wishlistContext';
import CartContextProvider from './Context/cartContext';
import { ToastContainer } from 'react-toastify';
import Address from './Componant/Address/Address';
import BrandDetails from './Componant/BrandDetails/BrandDetails';



function App() {


  let router = createBrowserRouter([
    {
      path: '/', element: <MainLayout />, children: [

        { index: true, element:  <Home />  },
        { path: "home", element:<Home /> },
        { path: "products", element: <ProtectedRoutes> <Products /> </ProtectedRoutes> },
        { path: "Categories", element: <ProtectedRoutes>  <Categories /> </ProtectedRoutes> },
        { path: "brands", element: <ProtectedRoutes><Brands /> </ProtectedRoutes> },
        { path: "cart", element: <ProtectedRoutes> <Cart /> </ProtectedRoutes> },
        { path: "wishlist", element: <ProtectedRoutes>  <WishList /> </ProtectedRoutes> },
        { path: "product-details/:id", element: <ProtectedRoutes>  <ProductDetails /> </ProtectedRoutes> },
        { path: "brand-details/:id", element: <ProtectedRoutes>  <BrandDetails /> </ProtectedRoutes> },
        { path: "address/:id", element: <ProtectedRoutes>  <Address /> </ProtectedRoutes> },
        { path: "*", element: <NotFound /> },
      ]
    },
    {
      path: '/', element: <AuthLayout />, children: [

        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
      ]
    },
  ])
  return (
    <>
      {/* by using storeProvider function now the context is shared over the whole  app */}
      <CartContextProvider>

      <WishListContextProvider>
        <RouterProvider router={router} />
      </WishListContextProvider>
      </CartContextProvider>


      {/* responsible for react-toastify and all configurations */}
      <ToastContainer theme='colored' autoClose={500}/>
    </>
  );
}

export default App;
