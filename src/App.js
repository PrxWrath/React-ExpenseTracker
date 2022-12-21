import React, { Suspense, useContext} from "react";
import { Route, Switch} from "react-router-dom";
import Header from "./components/Layout/Header";
import Context from "./store/Context";
import Loader from "./components/Layout/Loader";

const UserForm = React.lazy(()=>import("./components/Auth/UserForm"));
const Home = React.lazy(()=>import("./components/Home/Home"))
const Expenses = React.lazy(()=>import("./components/Expenses/Expenses"));

const App = () => {
  
  const authCtx = useContext(Context)

  return (
    <>
      <Header/>
      
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route exact path="/">
            {!authCtx.isLoggedIn&&<UserForm/>}
            {authCtx.isLoggedIn&&<Home/>}
          </Route>
          <Route exact path="/expenses">
            {!authCtx.isLoggedIn&&<UserForm/>}
            {authCtx.isLoggedIn&&<Expenses/>}
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
