import React, { useRef } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { expenseActions } from '../../store/ExpenseReducer';

const ExpenseForm = (props) => {
    
    const amountRef = useRef();
    const descRef = useRef();
    const categoryRef = useRef();
    const theme = useSelector(state=>state.theme.theme);
    const dispatch = useDispatch();
    
    if(props.edited){
        document.getElementById('amount').value = props.edited.amount;
        document.getElementById('description').value = props.edited.description;
    }

    const addExpenseHandler = () => {
        if(!props.edited){
            
                
            
            dispatch(expenseActions.addExpense({
                id: `expense${new Date().getTime()}`,
                amount: Number(amountRef.current.value),
                description: descRef.current.value,
                category: categoryRef.current.value,
                createdAt: new Date(),
            }));
            amountRef.current.value = '';
            descRef.current.value = '';
            
            
        }else{
            const oldAmount = Number(amountRef.current.value);
            dispatch(expenseActions.updateExpense({
                id:props.edited.id,
                amount:Number(amountRef.current.value),
                description:descRef.current.value,
                category: categoryRef.current.value,
                createdAt:new Date(),
                oldAmount
            }))
            props.setEdited(null);
            amountRef.current.value = '';
            descRef.current.value = '';    
        }
    }

    
    return (
    <>
        <Form className={`my-3 mx-auto w-50 rounded border border-success ${theme==='dark'?'text-warning':''} `}>
            <h3 className='w-100 bg-success text-center mb-3 text-light rounded-top'>{props.edited?'Edit Expense':'Add Expense'}</h3>
            <FloatingLabel controlId='amount' className='mb-3 mx-auto w-75' label='Amount (Rs.)'>
                <Form.Control className = {theme==='dark'?'bg-dark border border-warning text-warning':''} type='number' min={1} step={1} ref={amountRef}/>
            </FloatingLabel>
            <FloatingLabel controlId='description' className='mb-3 mx-auto w-75' label='Description'>
                <Form.Control className = {theme==='dark'?'bg-dark border border-warning text-warning':''} type='text' ref={descRef}/>
            </FloatingLabel>
            <FloatingLabel controlId='category' className='mb-3 mx-auto w-75' label='Category'>
                <Form.Select className = {theme==='dark'?'bg-dark border border-warning text-warning':''} ref={categoryRef}>
                    <option value="Groceries">Groceries</option>
                    <option value="Bills">Bills</option>
                    <option value="Transport">Transport</option>
                    <option value="Recreational">Recreational</option>
                </Form.Select>
            </FloatingLabel>
            <div className='w-100 text-center my-2'>
                <Button onClick={addExpenseHandler} variant='success' className='mx-1' size='lg'>{props.edited?'Update Expense':'+ Add Expense'}</Button>
                {props.edited&&<Button onClick={()=>{props.setEdited(null)}} variant='outline-danger' size='lg'>Cancel Update</Button>}
            </div>
        </Form>
    </>
  )
}

export default React.memo(ExpenseForm);