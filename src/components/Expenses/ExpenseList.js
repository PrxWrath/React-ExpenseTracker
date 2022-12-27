import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Button, ListGroup, Alert } from "react-bootstrap";
import classes from './ExpenseList.module.css';
import { expenseActions } from "../../store/ExpenseReducer";

const ExpenseList = (props) => {
    const expenses = useSelector(state=>state.expense.expenses);
    const theme = useSelector(state=>state.theme.theme);
    const dispatch = useDispatch();
    
    const onEdit = (expense) => {
        props.setEdited({
            id:expense.id,
            amount:expense.amount,
            description:expense.description,
            category:expense.category
        })
        dispatch(expenseActions.removeExpense(expense));
    }

    const deleteExpenseHandler = (expense) => {
      dispatch(expenseActions.removeExpense(expense));
    }
  
    return (
    <>
      {expenses.length?
      <ListGroup className={`w-50 mx-auto mt-4 p-2 ${classes.expenseList}`}>
        {expenses?.map((expense) => {
          return( 
            <ListGroup.Item key={expense.id} className={`d-flex justify-content-between border border-success my-1 rounded ${theme==='dark'?'bg-dark text-light border-warning':''}`}>
                <h5 className={`text-success mx-1 w-25 ${theme==='dark'?'text-warning':''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="my-auto bi bi-currency-rupee" viewBox="0 0 16 16">
                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z"/>
                  </svg>
                  {expense.amount}
                </h5>
                <h5 className="mx-1 w-25">--{expense.category}--</h5>
                <p className="mx-1">{`(${expense.description})`}</p>
                <div className="d-flex ms-auto h-75">
                    <Button variant="primary" size="sm" className="mx-1" onClick={()=>{onEdit(expense)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </Button>
                    <Button variant="danger" size="sm" className="mx-1" onClick={()=>{deleteExpenseHandler(expense)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </Button>
                </div>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
      :
       <Alert className='mx-auto w-50 fw-bold text-center' variant='warning'>No expenses to show :(</Alert>
      }
    </>
  );
};

export default React.memo(ExpenseList);
