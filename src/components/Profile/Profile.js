import React, { useRef, useState } from "react";
import {useSelector} from 'react-redux';
import { Alert, Button, Form } from "react-bootstrap";

const Profile = (props) => {
  const [alert, setAlert] = useState(<></>);
  const token = useSelector(state=>state.auth.loginToken)
  const fullNameRef = useRef();
  const UrlRef = useRef();
  
  const updateProfileHandler = async(e) => {
    e.preventDefault();
    try{
        if(!fullNameRef.current.value || !UrlRef.current.value){
            throw new Error('Fill out all the fields');
        }
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCi0kY1RZHcf880mPQSCgIn5301HEk1jyo',{
            method:'POST',
            body:JSON.stringify({
            idToken:token,
            displayName: fullNameRef.current.value,
            photoUrl: UrlRef.current.value,
            returnSecureToken: true
            }),
            headers:{
            'Content-Type':'application/json'
            }
        })

        const data = await res.json();
        
        fullNameRef.current.value = '';
        UrlRef.current.value = '';
        if(res.ok){
            setAlert(<Alert variant="success">Your details have been updated :)</Alert>)
            props.setComplete(true);
            setTimeout(()=>{setAlert(<></>)}, 3000)
        }else{
            throw new Error(data.error.errors[0].message);
        }

    }catch(err){
        setAlert(<Alert variant="danger">{err.message}</Alert>)
        setTimeout(()=>{setAlert(<></>)}, 3000)
    }
  }

  
  return (
    <>
      <Form className='w-50 p-2 my-2 mx-auto border-bottom border-success' onSubmit={updateProfileHandler}>
        <div className="w-100 d-flex justify-content-between">
          <h3>Profile Details</h3>
          <Button variant="outline-danger" size='sm' onClick={props.toggleProfile}>X Close</Button>
        </div>
        <Form.Group className='mb-3'>
          <Form.Label>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1 bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            Full Name
          </Form.Label>
          <Form.Control defaultValue={props.fullName} type="text" id="fullName" ref={fullNameRef} />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1 bi bi-link-45deg" viewBox="0 0 16 16">
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
            </svg>
            Photo URL
          </Form.Label>
          <Form.Control  defaultValue={props.photo} type="text" id="photoURL" ref={UrlRef}/>
        </Form.Group>
        <Button className="mb-2 " type="submit" variant="success">
          Update
        </Button>
        {alert}
      </Form>
    </>
  );
};

export default Profile;
