import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getCustomersListAPI } from "../actions";

const CustomerList = ({ customers, getCustomersList }) => {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchCustomersList = async () => {
      await getCustomersList(); // Wait for the data to be fetched
    };

    fetchCustomersList();
  }, [getCustomersList]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredUsers = customers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return fullName.toLowerCase().includes(searchValue.toLowerCase());
  });

  const handleCustomerClick = (customerId) => {
    history.push(`/customer/${customerId}`);
  };

  const handleCustomerSelectionClick = (customerId) => {
    history.push(`/customer-selection/${customerId}`);
  };

  return (
    <AppContainer>
      <NavBar>
        <NavLink to="/admin-actions">Admin Actions</NavLink>
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
              <TableHeader>Customer Id</TableHeader>
              <TableHeader>Email ID</TableHeader>
              {/* <TableHeader>Fabricator</TableHeader> */}
              <TableHeader>Date Visited</TableHeader>
              <TableHeader>View</TableHeader>
              <TableHeader>Add Selections</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => {
              const rowNumber = index + 1;
              const isEvenRow = rowNumber % 2 === 0;
              const customerLink = `/customer/${user.id}`;
              const customerSelectionLink = `/customer-selection/${user.id}`;

              return (
                <tr key={index}>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {rowNumber}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {user.firstName}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {user.lastName}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {user.customerId}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {user.email}
                  </TableCell>
                  {/* <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {fabricator.fabricatorName}
                  </TableCell> */}

                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {user.date}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    <button
                      to={customerLink}
                      onClick={() => handleCustomerClick(user.customerId)} // Call handleCustomerClick function
                    >
                      View
                    </button>{" "}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    <button
                      to={customerSelectionLink}
                      onClick={() =>
                        handleCustomerSelectionClick(user.customerId)
                      } // Call handleCustomerClick function
                    >
                      Add Selections
                    </button>{" "}
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
  width: 100%;
  color: black;
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
  align-items: center;
  background-color: white;
  color: black;
  margin: 100px;
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

const mapStateToProps = (state) => {
  return {
    customers: state.customerState.customers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCustomersList: (payload) => dispatch(getCustomersListAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
