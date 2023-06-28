import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import StonesActions from "./adminActions/StonesActions";
import EmployeesActions from "./adminActions/EmployeesActions";

const menu = ["Employees List", "Stones Actions"];

const AdminActions = ({ employeePermission }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container>
      <Menu>
        {menu.map((category) => (
          <MenuItem
            key={category}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>

      <ContentContainer>
        {employeePermission === "1" &&
          selectedCategory &&
          selectedCategory === "Employees List" && <EmployeesActions />}

        {employeePermission === "1" &&
          selectedCategory &&
          selectedCategory === "Stones Actions" && <StonesActions />}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  margin: 0 auto;
`;

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
  background-color: lightgray;
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
