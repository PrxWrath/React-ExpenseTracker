import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { Alert, Button } from 'react-bootstrap'

const Verify = (props) => {
    const [content, setContent] = useState('Your email is not verified yet! Verify email to secure your account');
    const token = useSelector(state=>state.auth.loginToken)
    const verifyEmailHandler = async() =>{
        try{
          const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCi0kY1RZHcf880mPQSCgIn5301HEk1jyo',{
            method:'POST',
            body:JSON.stringify({
                requestType: 'VERIFY_EMAIL',
                idToken:token
            }),
            headers:{
                'Content-Type':'application/json'
            }
          })
          const data = await res.json();
          if(!res.ok){
            throw new Error(data.error.errors[0].message)
          }else{
            setContent('Verification link sent to your email id.')
            setTimeout(()=>{props.setVerified(true)}, 3000);
          }
        }catch(err){
          setContent(err.message)
        }
      }
      
    return (
    <Alert className='d-flex justify-content-between' variant='warning'>
        <p>{content}.</p>
        <Button onClick={verifyEmailHandler} variant='outline-warning' className='text-dark'>Verify Email</Button>
    </Alert>
  )
}

export default Verify