import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import StonesActions from "./adminActions/StonesActions";
import EmployeesActions from "./adminActions/EmployeesActions";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const menu = ["Employees List", "Stones Actions"];

const AdminActions = ({ employeePermission, setHasWebsiteAccess }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const history = useHistory();

  console.log("Shubham, employeePermission:", employeePermission);

  const handleLogout = () => {
    setHasWebsiteAccess("false");
    history.push("/");
  };

  return (
    <Container>
      <NavBar>
        <NavLink to="/view">Customers</NavLink>
        <NavLink onClick={handleLogout}>Log Out</NavLink>
      </NavBar>
      {employeePermission === "1" && (
        <Layout>
          <Menu>
            {menu.map((category) => (
              <MenuItem
                key={category}
                onClick={() => handleCategorySelect(category)}
                isSelected={selectedCategory === category}
              >
                {category}
              </MenuItem>
            ))}
          </Menu>

          <ContentContainer>
            {selectedCategory && selectedCategory === "Employees List" && (
              <EmployeesActions />
            )}
            {selectedCategory && selectedCategory === "Stones Actions" && (
              <StonesActions />
            )}
          </ContentContainer>
        </Layout>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const NavBar = styled.nav`
  width: 100%;
  background-color: black;
  padding: 10px;
  display: flex;
  align-items: center;
  top: 0;
  position: fixed;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 10px;
  padding: 10px;
`;

const Layout = styled.div`
  margin-top: 80px;
  display: flex;
`;

const ContentContainer = styled.div``;

const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MenuItem = styled.li`
  width: 200px;
  height: 30px;
  border: 1px solid gray;
  text-align: center;
  display: inline-block;
  font-size: 25px;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "gray" : "lightgray")};
  margin-right: 5px;

  &:hover {
    background-color: gray;
  }
`;

const mapStateToProps = (state) => {
  return {
    // Add your state mappings here
    materials: state.stoneState.materials,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // Add your dispatch mappings here
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminActions);
