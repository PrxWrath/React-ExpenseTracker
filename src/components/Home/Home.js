import React from 'react'
import { Container } from 'react-bootstrap'

const Home = () => {
  return (
    <Container style={{marginTop:'5rem'}}>
        <div className='d-flex text-success border border-success my-2 p-2'>
            <h3>Welcome to expense tracker!</h3>
        </div>
    </Container>
  ) 
}

export default Home