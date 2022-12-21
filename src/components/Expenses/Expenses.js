import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  return (
    <Container style={{marginTop:'5rem'}}>
        <ExpenseForm setExpenses={setExpenses}/>
        <ExpenseList expenses={expenses}/>
    </Container>
  )
}

export default Expenses