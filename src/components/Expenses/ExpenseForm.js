import React, { useRef } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

const ExpenseForm = (props) => {
    
    const amountRef = useRef();
    const descRef = useRef();
    const categoryRef = useRef();

    const addExpenseHandler = () => {
        let expense = {
            id: `expense ${Math.random(6)}`,
            amount: amountRef.current.value,
            description: descRef.current.value,
            category: categoryRef.current.value
        }
        props.setExpenses(prev=>[...prev,expense])
    }
    return (
    <>
        <Form className='my-3 mx-auto w-50 rounded border border-success'>
            <h3 className='w-100 bg-success text-center mb-3 text-light rounded-top'>Add Expense</h3>
            <FloatingLabel controlId='amount' className='mb-3 mx-auto w-75' label='Amount (Rs.)'>
                <Form.Control type='number' min={1} step={1} ref={amountRef}/>
            </FloatingLabel>
            <FloatingLabel controlId='description' className='mb-3 mx-auto w-75' label='Description'>
                <Form.Control type='text' ref={descRef}/>
            </FloatingLabel>
            <FloatingLabel controlId='category' className='mb-3 mx-auto w-75' label='Category'>
                <Form.Select ref={categoryRef}>
                    <option value="Groceries">Groceries</option>
                    <option value="Bills">Bills</option>
                    <option value="Transport">Transport</option>
                    <option value="Recreational">Recreational</option>
                </Form.Select>
            </FloatingLabel>
            <div className='w-100 text-center my-2'>
                <Button onClick={addExpenseHandler} variant='success' size='lg'>+ Add Expense</Button>
            </div>
        </Form>
    </>
  )
}

export default ExpenseForm