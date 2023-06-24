import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { getCustomersListAPI, getSelectionsAPI } from "../actions";

const CustomerDetails = ({
  customers,
  selections,
  getCustomersList,
  getSelections,
}) => {
  const { id } = useParams();
  const customerId = parseInt(id, 10);
  const customer = customers.find((customer) => customer.id === customerId);

  useEffect(() => {
    const fetchData = async (customerId) => {
      await getCustomersList(); // Wait for the data to be fetched
      await getSelections(customerId);
    };

    fetchData(customerId);
  }, [customerId, getCustomersList, getSelections]);

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
          <TableHeader>ID</TableHeader>
          <TableData>{customer.id}</TableData>
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
        <TableRow>
          <TableHeader>Address</TableHeader>
          <TableData>{customer.address}</TableData>
        </TableRow>

        <TableRow>
          <TableHeader>Fabricator</TableHeader>
          <TableData>{customer.fabricator}</TableData>
        </TableRow>

        <TableRow>
          <TableHeader>Fabricator's Address</TableHeader>
          <TableData>{customer.f_address}</TableData>
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
            <TableHeader>Size</TableHeader>
            <TableHeader>Lot</TableHeader>
            <TableHeader>Finish</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {selections.map((selection, index) => {
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
      <Footer>
        <FooterContent>
          {customer.imageURL ? (
            <img
              src={customer.imageURL}
              alt="customer signature"
              style={{
                display: "block",
                margin: "0 auto",
                // border: "1px solid black",
                width: "150px",
              }}
            />
          ) : null}

          <h2>Customer's Signature</h2>
        </FooterContent>

        <FooterContent>
          <h2>Sale's Representative</h2>
        </FooterContent>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: white;
  color: black;
`;

const PrintButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: auto;
  margin-top: 20px;
  border: 2px solid #b2d3c2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #b2d3c2;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 8px;
  &:nth-child(even) {
    background-color: #b2d3c2;
  }
`;

const SelectionTable = styled.table`
  border: 2px solid #b2d3c2;
  width: 70%;
  height: 200px;
`;
const TableData = styled.td`
  text-align: left;
  padding: 8px;
`;

const TableCell = styled.td`
  text-align: center;
  padding: 15px;
  background-color: ${(props) => (props.isEvenRow ? "#b2d3c2" : "transparent")};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  page-break-after: always; /* Add page break after footer */
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 100px;
  justify-content: end;
  h2 {
    color: black;
  }
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
