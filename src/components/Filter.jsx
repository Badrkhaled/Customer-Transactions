import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const Filter = ({ onFilter }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleFilter = () => {
    onFilter(name, amount);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={2}
      className="filter-container"
    >
      <TextField
        label="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Transaction Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleFilter}>
        Filter
      </Button>
    </Box>
  );
};

export default Filter;
