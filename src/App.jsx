import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Paper } from "@mui/material";
import CustomerTable from "./components/CustomerTable";
import Filter from "./components/Filter";
import TransactionPieChart from "./components/TransactionPieChart";
import TransactionBarChart from "./components/TransactionBarChart";
import "./App.css";
import Navbar from "./components/navbar";

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://badrkhaled.github.io/api/api.json"
        );
        const customerData = response.data.customers;
        const transactionData = response.data.transactions;
        setCustomers(customerData);
        setTransactions(transactionData);
        setFilteredCustomers(customerData); // Initially, show all customers
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (name, amount) => {
    let filtered = customers;
    if (name) {
      filtered = filtered.filter((customer) =>
        customer.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (amount) {
      filtered = filtered.filter((customer) =>
        transactions.some(
          (transaction) =>
            transaction.customer_id === customer.id &&
            transaction.amount >= amount
        )
      );
    }
    setFilteredCustomers(filtered);
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const getAggregatedTransactions = (transactionsList) => {
    const aggregatedTransactions = transactionsList.reduce(
      (acc, transaction) => {
        const existing = acc.find((t) => t.date === transaction.date);
        if (existing) {
          existing.amount += transaction.amount;
        } else {
          acc.push({ date: transaction.date, amount: transaction.amount });
        }
        return acc;
      },
      []
    );
    return aggregatedTransactions;
  };

  const allTransactions = selectedCustomer
    ? transactions.filter(
        (transaction) => transaction.customer_id === selectedCustomer.id
      )
    : transactions;

  const aggregatedTransactions = getAggregatedTransactions(allTransactions);

  return (
    <>
      <Navbar />
      <Container className="App">
        <Typography variant="h4" gutterBottom>
          Customer Transactions
        </Typography>
        <div className="container">
          <div className="section">
            <Typography variant="h5" gutterBottom>
              Transactions
            </Typography>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Filter onFilter={handleFilter} />
              <CustomerTable
                customers={filteredCustomers}
                transactions={transactions}
                onCustomerSelect={handleCustomerSelect}
              />
            </Paper>
          </div>
          <div className="section">
            <Typography variant="h5" gutterBottom>
              Spend Analysis
            </Typography>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <TransactionPieChart transactions={aggregatedTransactions} />
            </Paper>
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
              <TransactionBarChart transactions={aggregatedTransactions} />
            </Paper>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
