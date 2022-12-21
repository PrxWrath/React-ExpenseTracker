import React from "react";
import { ListGroup } from "react-bootstrap";

const ExpenseList = (props) => {
  return (
    <>
      <ListGroup className="w-50 mx-auto mt-4 p-2">
        {Object.values(props.expenses).map((expense) => {
          return( 
            <ListGroup.Item key={expense.id} className="d-flex justify-content-between border border-success my-1">
                <h5 className="text-success">Rs. {expense.amount}</h5>
                <h5>--{expense.category}--</h5>
                <p>{`(${expense.description})`}</p>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </>
  );
};

export default React.memo(ExpenseList);
