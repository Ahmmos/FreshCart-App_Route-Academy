import axios from "axios";
import { createContext, useState } from "react";




// createContext is a hook to create new context

export let cartContext = createContext(0);

async function addToCart(productId) {

    try {
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return data;
    } catch (err) {
        return err;
    }
}

async function getCartItems() {
    try {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: localStorage.getItem("token")
            }

        });
        return data;
    } catch (error) {
        return error;
    }
}

async function removeCartItem(productId) {
    try {
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ productId }`,  {
            headers: {
                token: localStorage.getItem("token")
               
            }

        });
       
        return data;

        

    } catch (error) {
        return error;
    }
}

async function UpdateItemQuantity(productId,count) {
    try {
        let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${ productId }`, {count} ,  {
            headers: {
                token: localStorage.getItem("token")
               
            }

        });
       
        return data;

        

    } catch (error) {
        return error;
    }
}

async function Pay(cartId,shippingAddress) {
    try {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${ cartId }`, {shippingAddress} ,  {
            headers: {
                token: localStorage.getItem("token")
               
            }

        });
       
        return data;

        

    } catch (error) {
        return error;
    }
}

export default function CartContextProvider({ children }) {

    let [counter, setCounter] = useState(0)


    // values an object that contains values will be shared to the whole project
    // provider is built in inside any context 

    return <cartContext.Provider value={{ 
        counter,
        setCounter, 
        addToCart, 
        getCartItems, 
        removeCartItem,
        UpdateItemQuantity,
        Pay
        }}>
        {children}
    </cartContext.Provider>
}


