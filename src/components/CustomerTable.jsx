import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CustomerTable = ({ customers, transactions, onCustomerSelect }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Transactions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              onClick={() => onCustomerSelect(customer)}
            >
              <TableCell>{customer.name}</TableCell>
              <TableCell>
                {transactions
                  .filter(
                    (transaction) => transaction.customer_id === customer.id
                  )
                  .map((transaction) => (
                    <div key={transaction.id}>
                      {transaction.date}: ${transaction.amount}
                    </div>
                  ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
