import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { getCustomersListAPI, getSelectionsAPI } from "../actions";

const CustomerDetails = (props) => {
  const { id } = useParams();
  const customerId = parseInt(id, 10);
  const customer = props.customers.find(
    (customer) => customer.id === customerId
  );

  useEffect(() => {
    const fetchData = async (customerId) => {
      await props.getCustomersList(); // Wait for the data to be fetched

      await props.getSelections(customerId);
    };

    fetchData(customerId);
  }, [props.getCustomersList()]);

  console.log("customer:", customer);
  console.log("selections: ", props.selections);

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
          <TableHeader>Date Visited</TableHeader>
          <TableData>{customer.date}</TableData>
        </TableRow>
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
          <TableHeader>Phone</TableHeader>
          <TableData>{customer.phone}</TableData>
        </TableRow>
        {/* <TableRow>
          <TableHeader>Address</TableHeader>
          <TableData>{customer.address}</TableData>
        </TableRow> */}

        <TableRow>
          <TableHeader>Fabricator</TableHeader>
          <TableData>{customer.fabricator}</TableData>
        </TableRow>

        <TableRow>
          <TableHeader>Kitchen and Bath</TableHeader>
          <TableData>{customer.kitchenandbath}</TableData>
        </TableRow>

        <TableRow>
          <TableHeader>Designer / Architect</TableHeader>
          <TableData>{customer.designerorarchitech}</TableData>
        </TableRow>
      </Table>
      <br />
      <br />
      <SelectionTable>
        <thead>
          <tr>
            <TableHeader>#</TableHeader>
            <TableHeader>Material</TableHeader>
            <TableHeader>Option</TableHeader>
            <TableHeader>Size</TableHeader>
            <TableHeader>Lot</TableHeader>
            <TableHeader>Color</TableHeader>
            {/* <TableHeader>Actions</TableHeader>  */}
          </tr>
        </thead>
        <tbody>
          {props.selections.map((selection, index) => {
            const rowNumber = index + 1;
            const isEvenRow = rowNumber % 2 === 0;

            return (
              <tr key={index}>
                <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                  {rowNumber}
                </TableCell>
                <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                  {selection.selectedCategory}
                  {/* Link to customer page */}
                </TableCell>
                <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                  {selection.selectedOption}
                </TableCell>
                <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                  {selection.size}
                </TableCell>

                <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                  {selection.lot}
                </TableCell>
                <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                  {selection.color}
                </TableCell>
              </tr>
            );
          })}
        </tbody>
      </SelectionTable>
    </Container>
  );
};

const SelectionTable = styled.table`
  border: 2px solid forestgreen;
  width: 1000px;
  height: 200px;
`;

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
    background-color: grey;
  }
`;

const TableHeader = styled.th`
  color: white;
  text-align: left;
  padding: 8px;
  &:nth-child(even) {
    background-color: grey;
  }
`;

const TableData = styled.td`
  text-align: left;
  padding: 8px;
`;

const TableCell = styled.td`
  text-align: center;
  padding: 15px;
  background-color: ${(props) => (props.isEvenRow ? "#B2D3C2" : "transparent")};
`;

const mapStateToProps = (state) => {
  return {
    customers: state.customerState.customers,
    selections: state.customerState.selections,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCustomersList: () => dispatch(getCustomersListAPI()),

  getSelections: (customerId) => {
    dispatch(getSelectionsAPI({ customerId }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);
