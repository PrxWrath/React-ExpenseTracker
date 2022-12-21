import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  
  const loadExpenses = async() => {
    const res = await fetch('https://expense-tracker-4ce23-default-rtdb.firebaseio.com/expenses.json')
    const data = await res.json();
    if(res.ok){
       Object.values(data).forEach(expense=>{
        setExpenses(prev=>[expense,...prev])
       })
    } 
  }

  useEffect(()=>{
    loadExpenses()
  }, []);

  return (
    <Container style={{marginTop:'5rem'}}>
        <ExpenseForm setExpenses={setExpenses}/>
        <ExpenseList expenses={expenses}/>
    </Container>
  )
}

export default Expenses