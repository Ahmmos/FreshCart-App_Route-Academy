import axios from "axios";
import { createContext, useState } from "react";




// createContext is a hook to create new context

export let wishlistContext = createContext(0);

async function addToWishList(productId) {

    try {
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return data;
    } catch (err) {
        return err;
    }
}

async function getWishListItems() {
    try {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
                token: localStorage.getItem("token")
            }

        });
        return data;
    } catch (error) {
        return error;
    }
}

async function removeWishListItem(productId) {
    try {
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${ productId }`,  {
            headers: {
                token: localStorage.getItem("token")
               
            }

        });
       
        return data;

        

    } catch (error) {
        return error;
    }
}



export default function WishListContextProvider({ children }) {

   
    let [wishes, setWishes] = useState(0);


    // values an object that contains values will be shared to the whole project
    // provider is built in inside any context 

    return <wishlistContext.Provider value={{ 
        wishes,
        setWishes, 
        addToWishList, 
        getWishListItems, 
        removeWishListItem
        }}>
        {children}
    </wishlistContext.Provider>
}


