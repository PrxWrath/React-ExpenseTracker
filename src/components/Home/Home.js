import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Profile from "../Profile/Profile";

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [complete, setComplete] = useState(false);
  const toggleProfile = () => [setShowProfile((prev) => !prev)];
  
  return (
    <Container style={{ marginTop: "5rem" }}>
      <div className="d-flex justify-content-between text-success border border-success my-2 p-2">
        <h3>Welcome to expense tracker!</h3>
        {complete ? (
          <Alert variant="success">Your profile is 100% completed </Alert>
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
      {showProfile && <Profile toggleProfile={toggleProfile} setComplete={setComplete}/>}
    </Container>
  );
};

export default Home;
