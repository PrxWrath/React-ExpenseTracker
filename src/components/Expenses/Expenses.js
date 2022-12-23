import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {expenseActions} from '../../store/ExpenseReducer'
import { authActions } from '../../store/AuthReducer'
import { Alert, Button, Container } from 'react-bootstrap'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import {CSVLink} from 'react-csv';

const Expenses = () => {
  const dispatch = useDispatch();
  const email = useSelector(state=>state.auth.loginEmail);
  const totalAmount = useSelector(state=>state.expense.total);
  const premiumUser = useSelector(state=>state.auth.premium);
  const theme = useSelector(state=>state.theme.theme);
  const [edited, setEdited] = useState(null);
  const [premium, setPremium] = useState(false);
  const [csvData, setCsvData] = useState([]);
  
  const headers = [
    {label:'Amount', key:'amount'},
    {label:'Category', key:'category'},
    {label:'ExpenseDate', key:'createdAt'},
    {label:'Description', key:'description'},
  ]
  
  const loadExpenses = async() => {
    setPremium(false);
    try{
      dispatch(expenseActions.clear())
      const res = await fetch(`https://expense-tracker-4ce23-default-rtdb.firebaseio.com/expenses${email}.json`)
      const data = await res.json();
      if(res.ok){
        if(data){
          let total = 0;
          let csv = [];
          Object.values(data).forEach(expense=>{
            dispatch(expenseActions.addExpense(expense));
            csv.push(expense);
            total+=Number(expense.amount)
          })
          setCsvData(csv);
          if(total>=10000){
            setPremium(true);
          }
          dispatch(expenseActions.updateTotal(total));
        }else{
          dispatch(expenseActions.updateTotal(0));
        }
      }else{
        
        throw new Error('Request failed');
      }
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    loadExpenses()
  }, []);

  const activatePremiumHandler = () => {
    dispatch(authActions.activatePremium())
  }

  return (
    <Container style={{paddingTop:'5rem'}}>
            <div className='w-100 d-flex'>
              {!premiumUser?
              <>
                {premium?
                  <Button onClick = {activatePremiumHandler} variant='outline-warning' size='md' className='h-50 fw-bold'> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="gold" className="mx-1 bi bi-star-fill" viewBox="0 0 17 17">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    Activate Premium 
                  </Button>
                  :
                  <Alert className='w-50 me-auto fw-bold text-center' variant='warning'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="gold" className="mx-1 bi bi-star-fill" viewBox="0 0 17 17">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    Amount left for premium:
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="my-auto bi bi-currency-rupee" viewBox="0 0 16 16">
                        <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z"/>
                    </svg>
                    {10000-totalAmount}            
                  </Alert>
                }
                <div className='ms-auto w-25'>
                  <h4 className='d-flex justify-content-between'>Total Amount Spent: 
                  <p className={`text-success ${theme==='dark'?'text-warning':''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="my-auto bi bi-currency-rupee" viewBox="0 0 16 16">
                      <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z"/>
                    </svg>
                    {totalAmount}
                  </p>
                  </h4>
                </div>
                </>
                :
                <>
                <div className='me-auto w-25' >
                  <h4 className='d-flex justify-content-between'>Amount Spent: 
                  <p className={`text-success ${theme==='dark'?'text-warning':''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="my-auto bi bi-currency-rupee" viewBox="0 0 16 16">
                      <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z"/>
                    </svg>
                    {totalAmount}
                  </p>
                  </h4>
                </div>
                <div className='w-25 ms-auto text-center'>
                <CSVLink style={{textDecoration:'none', color:'currentcolor'}} filename={`${email}/expenses`} data={csvData} headers={headers}>
                  <Button className='p-2' variant={theme==='dark'?'outline-warning':'success'} size='md'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1 bi bi-download" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg>

                    Download CSV
                  </Button>
                </CSVLink>
                </div>
                </>
                }
            </div>
        <ExpenseForm loadExpenses={loadExpenses} edited={edited} setEdited={setEdited}/>
        <ExpenseList loadExpenses={loadExpenses} setEdited={setEdited}/>
    </Container>
  )
}

export default Expenses