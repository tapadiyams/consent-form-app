import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getCustomersListAPI, getFabricatorsAPI } from "../actions";

const CustomerList = ({
  employeeName,
  employeePermission,
  customers,
  getCustomersList,
  fabricators,
  getFabricators,
}) => {
  const [search, setSearch] = useState({
    firstName: "",
    lastName: "",
    customerId: "",
    email: "",
    date: "",
    fabricator: "",
  });
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      await getCustomersList();
      await getFabricators();
    };

    fetchData();
  }, [getCustomersList, getFabricators, employeeName, employeePermission]);

  const handleSearchChange = (e, columnName) => {
    setSearch({
      ...search,
      [columnName]: e.target.value,
    });
  };

  const getAssociatedFabricator = (customerId) => {
    const fabricator =
      fabricators &&
      Object.values(fabricators).find(
        (f) => f.customerId && f.customerId === customerId
      );

    return fabricator ? fabricator.fabricatorName : "N/A";
  };

  const filteredUsers = customers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`;

    return (
      fullName.toLowerCase().includes(search.firstName.toLowerCase()) &&
      user.lastName.toLowerCase().includes(search.lastName.toLowerCase()) &&
      user.customerId &&
      user.customerId
        .toString()
        .toLowerCase()
        .includes(search.customerId.toLowerCase()) &&
      user.date.toLowerCase().includes(search.date.toLowerCase()) &&
      getAssociatedFabricator(user.customerId)
        .toLowerCase()
        .includes(search.fabricator.toLowerCase())
    );
  });

  const handleCustomerClick = (customerId) => {
    history.push(`/customer/${customerId}`);
  };

  const handleCustomerSelectionClick = (customerId) => {
    history.push(`/customer-selection/${customerId}`);
  };

  return (
    <AppContainer>
      {console.log(
        " Shubham, employeeName employeePermission",
        employeeName,
        employeePermission
      )}
      <NavBar>
        <NavLink to="/admin-actions">Admin Actions</NavLink>
        <NavLink to="/">Log Out</NavLink>
      </NavBar>
      <Content>
        <Table>
          <thead>
            <tr>
              <TableHeader>#</TableHeader>
              <TableHeader>First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>Customer Id</TableHeader>
              <TableHeader>Email ID</TableHeader>
              <TableHeader>Fabricator</TableHeader>
              <TableHeader>Date Visited</TableHeader>
              <TableHeader>View</TableHeader>
              <TableHeader>Add Selections</TableHeader>
            </tr>
            <tr>
              <TableHeader></TableHeader>
              <TableHeader>
                <input
                  value={search.firstName}
                  placeholder="Search"
                  onChange={(e) => handleSearchChange(e, "firstName")}
                />
              </TableHeader>
              <TableHeader>
                <input
                  value={search.lastName}
                  placeholder="Search"
                  onChange={(e) => handleSearchChange(e, "lastName")}
                />
              </TableHeader>
              <TableHeader>
                <input
                  value={search.customerId}
                  placeholder="Search"
                  onChange={(e) => handleSearchChange(e, "customerId")}
                />
              </TableHeader>
              <TableHeader>
                <input
                  value={search.email}
                  placeholder="Search"
                  onChange={(e) => handleSearchChange(e, "email")}
                />
              </TableHeader>
              <TableHeader>
                <input
                  value={search.fabricator}
                  placeholder="Search"
                  onChange={(e) => handleSearchChange(e, "fabricator")}
                />
              </TableHeader>
              <TableHeader>
                <input
                  value={search.date}
                  placeholder="Search"
                  onChange={(e) => handleSearchChange(e, "date")}
                />
              </TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
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
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {getAssociatedFabricator(user.customerId)}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {user.date}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    <button
                      to={customerLink}
                      onClick={() => handleCustomerClick(user.customerId)}
                    >
                      View
                    </button>{" "}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    <button
                      to={customerSelectionLink}
                      onClick={() =>
                        handleCustomerSelectionClick(user.customerId)
                      }
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
    fabricators: state.customerState.fabricator,
    employee: state.stoneState.employee,
    permission: state.stoneState.permission,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCustomersList: (payload) => dispatch(getCustomersListAPI(payload)),
  getFabricators: () => dispatch(getFabricatorsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
