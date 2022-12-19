import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = (props) => {
  //auth context management
  const localToken = localStorage.getItem('LOGIN_TOKEN');
  const localEmail  = localStorage.getItem('EMAIL')
  const [loginToken, setLoginToken] = useState(localToken);
  const [email, setEmail] = useState(localEmail);

  const isLoggedIn = !!loginToken;
  
    
  const userLogin = (token,email) =>{
    setLoginToken(token);
    setEmail(email.replace('@', '').replace('.',''));
    localStorage.setItem('EMAIL',email.replace('@', '').replace('.',''));
    localStorage.setItem('LOGIN_TOKEN', token);
  }
  
  const userLogout = ()=>{
    setLoginToken(null);
    localStorage.clear();
  }


  
  return (
    <Context.Provider
      value={{
        isLoggedIn: isLoggedIn,
        logInToken: loginToken,
        userLogin: userLogin,
        userLogout: userLogout,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
