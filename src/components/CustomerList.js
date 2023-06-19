import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import CustomerDetails from "./CustomerDetails";
import { getCustomersListAPI } from "../actions";

const CustomerList = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory(); // Use useHistory hook

  useEffect(() => {
    props.getCustomersList();
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredUsers = props.customers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return fullName.toLowerCase().includes(searchValue.toLowerCase());
  });

  const handleCustomerClick = (customerId) => {
    history.push(`/customer/${customerId}`);
  };

  return (
    <AppContainer>
      <NavBar>
        <NavLink to="/admin-action">Admin Actions</NavLink>
        <NavLink to="/logout">Log Out</NavLink>
      </NavBar>
      <Content>
        <Search>
          <p>Search</p>
          <input value={searchValue} onChange={handleSearchChange} />
        </Search>
        <Table>
          <thead>
            <tr>
              <TableHeader>#</TableHeader>
              <TableHeader>First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>Email ID</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Date Visited</TableHeader>
              <TableHeader>Actions</TableHeader> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => {
              const rowNumber = index + 1;
              const isEvenRow = rowNumber % 2 === 0;
              const customerLink = `/customer/${user.id}`;

              return (
                <tr key={index}>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {rowNumber}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    <Link
                      to={customerLink}
                      onClick={() => handleCustomerClick(user.id)} // Call handleCustomerClick function
                    >
                      {user.firstName}
                    </Link>{" "}
                    {/* Link to customer page */}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {user.lastName}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {user.email}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {user.address}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {user.date}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    <PrintButton onClick={() => window.print()}>
                      &#128438;
                    </PrintButton>{" "}
                    {/* Print button */}
                  </TableCell>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Content>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  background-color: white;
  color: black;
  width: 100%;
  height: 100vh;
`;

const NavBar = styled.nav`
  width: 100%;
  background-color: black;
  padding: 10px;
  display: flex;
  align-items: center;
  top: 0;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 10px;
  padding: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: white;
  color: black;
  margin: auto;
`;

const Search = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  p {
    color: black;
  }
`;

const Table = styled.table`
  border: 2px solid forestgreen;
  width: 1000px;
  height: 200px;
`;

const TableHeader = styled.th`
  border-bottom: 1px solid black;
`;

const TableCell = styled.td`
  text-align: center;
  padding: 15px;
  background-color: ${(props) => (props.isEvenRow ? "#B2D3C2" : "transparent")};
`;

const PrintButton = styled.button`
  /* Define your print button styles here */
`;

const mapStateToProps = (state) => {
  return {
    customers: state.customerState.customers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCustomersList: (payload) => dispatch(getCustomersListAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
