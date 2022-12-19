import React, { Suspense, useContext} from "react";
import { Route, Switch} from "react-router-dom";
import Header from "./components/Layout/Header";
import Context from "./store/Context";
import Loader from "./components/Layout/Loader";

const UserForm = React.lazy(()=>import("./components/Auth/UserForm"));

const App = () => {
  
  const authCtx = useContext(Context)

  return (
    <>
      <Header/>
      
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route exact path="/">
            {!authCtx.isLoggedIn&&<UserForm/>}
            <></>
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
