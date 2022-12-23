import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {authActions} from '../../store/AuthReducer';
import {NavLink, useHistory} from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const Header = (props) => {
  const history = useHistory();
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = ()=>{
    dispatch(authActions.logout());
    history.replace('/auth')
  }
  return (
    <>
      <Navbar className="fw-bold" expand="sm" variant="dark" bg="success" fixed="top">
        <Container>
            <Navbar.Brand href="/">ExpenseTracker.</Navbar.Brand>
            <Nav className="ms-auto">
              <>
              {!isLoggedIn&&
                <NavLink exact to="/auth" style={{textDecoration:'none', margin:'0.5rem', color:'#ffffff'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1 bi bi-file-person" viewBox="0 0 16 16">
                  <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                  <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                  SignUp
                </NavLink>
              }
              </>
              {isLoggedIn&&
                (
                <>
                <NavLink to="/expenses" style={{textDecoration:'none', margin:'0.5rem', color:'#ffffff'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                  <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z"/>
                </svg>
                  Expenses
                </NavLink>
                <Button onClick={logoutHandler} variant="outline-success" className="text-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1 bi bi-box-arrow-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                  <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                </svg>
                  Logout
                </Button>
                </>
                )
              }
            </Nav>
            
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
