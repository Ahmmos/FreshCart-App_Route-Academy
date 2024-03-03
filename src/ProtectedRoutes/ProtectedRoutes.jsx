
// this is a componant act as layer to the other componants where here
// we will ensure if there is token or not and if  yes then redirect user to dashboard page
//  otherwise login page.
// all componants will be children of this componant

import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

// children ==> should be written correct 
// they are the componant that be protected by this componant
// this componant should return jsx code thats why we used Navigate

export default function ProtectedRoutes({children}) {

let token =localStorage.getItem('token')


try {
    // help us to check that  our token exist in local storage  is a vaild token
    const decoded = jwtDecode(token); 
    if(decoded.role != "user"){
        localStorage.clear(token);
        return <Navigate to= "/signin"/>
    }
} catch (error) {
    localStorage.clear(token);
    return <Navigate to= "/signin"/>
}

if(token) return children

 return <Navigate to= "/signin"/>
}
