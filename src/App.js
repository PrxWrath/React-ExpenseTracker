import React, { Suspense } from "react";
import {useSelector} from 'react-redux';
import { Route, Switch} from "react-router-dom";
import Header from "./components/Layout/Header";
import Loader from "./components/Layout/Loader";

const UserForm = React.lazy(()=>import("./components/Auth/UserForm"));
const Home = React.lazy(()=>import("./components/Home/Home"))
const Expenses = React.lazy(()=>import("./components/Expenses/Expenses"));

const App = () => {
  
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);

  return (
    <>
      <Header/>
      
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route exact path="/">
            {!isLoggedIn&&<UserForm/>}
            {isLoggedIn&&<Home/>}
          </Route>
          <Route exact path="/expenses">
            {!isLoggedIn&&<UserForm/>}
            {isLoggedIn&&<Expenses/>}
          </Route>
          <Route exact path="/auth">
            <UserForm />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
