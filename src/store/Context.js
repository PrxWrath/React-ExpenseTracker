import React from 'react'

const Context = React.createContext({
    isLoggedIn: false,
    logInToken: null,
    userLogin: (token, email)=>{},
    userLogout: ()=>{},
})

export default Context