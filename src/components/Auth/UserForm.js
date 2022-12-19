import React, {useRef, useState, useContext} from 'react'
import { Alert, Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom';
import Context from '../../store/Context';

const UserForm = () => {

  const [alert, setAlert] = useState(<></>);
  const [login, setLogin] = useState(false);

  const authCtx = useContext(Context);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
 
  const toggleLoginHandler = () => {
    setLogin(prev=>!prev);
  }

  const submitHandler = async(e) => {
    e.preventDefault();
      if(!login){
        try{
          if(!emailRef.current.value && !passwordRef.current.value){
            setAlert(<Alert variant='danger'>Fill all the fields!</Alert>)
            setTimeout(()=>{setAlert(<></>)}, 3000)
          }
          else if(confirmRef.current.value !== passwordRef.current.value){
            setAlert(<Alert variant='danger'>Passwords don't match!</Alert>)
            setTimeout(()=>{setAlert(<></>)}, 3000)
          }
          else{
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCi0kY1RZHcf880mPQSCgIn5301HEk1jyo',{
              method:'POST',
              body:JSON.stringify({
                email:emailRef.current.value,
                password: passwordRef.current.value,
                returnSecureToken: true
              }),
              headers:{
                'Content-Type':'application/json'
              }
            })

            const data = await res.json();
            
            if(!res.ok){  
              throw new Error(data.error.errors[0].message)
            }else{
              setAlert(<Alert variant='success'>Your account has been created. Please login with new account :)</Alert>)
              setTimeout(()=>{setAlert(<></>)}, 3000)
              console.log("User has successfully signed up")
            }

            emailRef.current.value = '';
            passwordRef.current.value = '';
            confirmRef.current.value = '';
          }
        }catch(err){
          setAlert(<Alert variant='danger'>{err.message}</Alert>)
          setTimeout(()=>{setAlert(<></>)}, 3000)
        }
      }else{
        try{
          if(!emailRef.current.value && !passwordRef.current.value){
            setAlert(<Alert variant='danger'>Fill all the fields!</Alert>)
            setTimeout(()=>{setAlert(<></>)}, 3000)
          }
          else{
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCi0kY1RZHcf880mPQSCgIn5301HEk1jyo',{
              method:'POST',
              body:JSON.stringify({
                email:emailRef.current.value,
                password: passwordRef.current.value,
                returnSecureToken: true
              }),
              headers:{
                'Content-Type':'application/json'
              }
            })

            const data = await res.json();
            
            if(!res.ok){  
              throw new Error(data.error.errors[0].message)
            }else{
              authCtx.userLogin(data.idToken, data.email);
              history.replace('/')
            }

            emailRef.current.value = '';
            passwordRef.current.value = '';
          }
        }catch(err){
          setAlert(<Alert variant='danger'>{err.message}</Alert>)
          setTimeout(()=>{setAlert(<></>)}, 3000)
        }

      }
    
  };
  
   return (
    <Container style={{marginTop:'8rem'}}>
        <div className='w-50 mx-auto my-1'>
            {alert}
        </div>
        <div className='d-flex w-50 shadow-lg rounded mx-auto'>
          <img src={require('../../resources/userFormBg.jpg')} alt='signup bg' className="w-50"/>
          <Form className='w-50 mx-auto p-3 my-1 text-success' onSubmit={submitHandler}>
              <h3 className='mx-auto my-2 mb-3 w-50 border-bottom border-success text-center'>{login?'Login':'Signup'}</h3>
              <FloatingLabel controlId='email' className='mb-3' label='Your Email'>
                  <Form.Control type='email' ref={emailRef}/>
              </FloatingLabel>
              <FloatingLabel controlId='password' className='mb-3' label='Your Password'>
                  <Form.Control type='password' ref={passwordRef}/>
              </FloatingLabel>
              {!login&&
              <FloatingLabel controlId='confirm' className='mb-3' label='Confirm Password'>
                  <Form.Control type='password' ref={confirmRef}/>
              </FloatingLabel>
              }
              
              <div className='my-2 w-100 text-center'>
                  <Button type='submit' variant='success' size='md'>{login?'Login':'Create Account'}</Button>
              </div>
              {login&&
              <div className='my-2 w-100 text-center'>
                <NavLink to='#' className='text-success'>Forgot Password?</NavLink>
              </div>
              }
              <div className='my-2 w-100 text-center'>
                  <Button onClick={toggleLoginHandler} size='sm' variant='outline-success'>{login?'Create new account':'Login with existing account'}</Button>
              </div>
          </Form>
        </div>
    </Container>
  )
}

export default UserForm