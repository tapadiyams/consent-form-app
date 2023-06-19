import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const customers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Anytown, USA",
    date: "March 10",
  },
  // Add more customers as needed
];

const CustomerDetails = () => {
  console.log("hi");
  const { id } = useParams();
  const customerId = parseInt(id, 10);
  const customer = customers.find((customer) => customer.id === customerId);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container>
      <PrintButton onClick={handlePrint}>Print</PrintButton>
      <Table>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableData>
            {customer.firstName} {customer.lastName}
          </TableData>
        </TableRow>
        <TableRow>
          <TableHeader>Email</TableHeader>
          <TableData>{customer.email}</TableData>
        </TableRow>
        <TableRow>
          <TableHeader>Address</TableHeader>
          <TableData>{customer.address}</TableData>
        </TableRow>
        <TableRow>
          <TableHeader>Date Visited</TableHeader>
          <TableData>{customer.date}</TableData>
        </TableRow>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PrintButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 400px;
  margin-bottom: 20px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  background-color: #4caf50;
  color: white;
  text-align: left;
  padding: 8px;
`;

const TableData = styled.td`
  text-align: left;
  padding: 8px;
`;

export default CustomerDetails;
