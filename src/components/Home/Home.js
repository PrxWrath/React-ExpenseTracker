import React, { useState, useCallback, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Profile from "../Profile/Profile";
import Verify from "../Profile/Verify";

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [complete, setComplete] = useState(false);
  const [verified, setVerified] = useState(false);
  const [fullName, setFullName] = useState('');
  const [photo, setPhoto] = useState('');
  const token = useSelector(state=>state.auth.loginToken);

  const toggleProfile = () => [setShowProfile((prev) => !prev)];
  
  const loadProfile = useCallback(async() => {
    try{
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCi0kY1RZHcf880mPQSCgIn5301HEk1jyo',{
            method:'POST',
            body:JSON.stringify({
                idToken:token
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await res.json();
        if(res.ok && data.users[0].displayName){
            setFullName(data.users[0].displayName);
            setPhoto(data.users[0].photoUrl);
            setComplete(true);
        }
        else{
            throw new Error("Some problem occured while fetching your details")
        }

        if(data.users[0].emailVerified){
          setVerified(true);
        }
    }catch(err){
        setComplete(false);
    }
  },[token])


  useEffect(()=>{
    loadProfile();
  }, [loadProfile])

  return (
    <Container style={{ paddingTop: "5rem" }}>
      {!verified&&<Verify setVerified = {setVerified}/>}
      <div className="d-flex justify-content-between text-success border border-success my-2 p-2">
        <h3>Welcome to expense tracker!</h3>
        {complete ? (
          <Alert variant="success">Your profile is 100% completed. <NavLink to="#" style={{color:"green"}} onClick={toggleProfile}>Edit Details</NavLink> </Alert>
        ) : (
          <Alert variant="danger">
            Your profile is incomplete.{" "}
            {!showProfile ? (
              <NavLink
                to="#"
                onClick={toggleProfile}
                style={{ color: "crimson" }}
              >
                Complete Now
              </NavLink>
            ) : (
              "Your Profile is only 67% complete. Fill out your details now."
            )}
          </Alert>
        )}
      </div>
      {showProfile && <Profile toggleProfile={toggleProfile} setComplete={setComplete} fullName={fullName} photo = {photo}/>}
    </Container>
  );
};

export default Home;
