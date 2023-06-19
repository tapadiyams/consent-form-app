import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const menu = ["Employee List", "Edit Materials"];

const AdminActions = () => {
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
        {selectedCategory && selectedCategory === "Employee List" && (
          <EmployeeList />
        )}

        {selectedCategory && selectedCategory === "Edit Materials" && (
          <EditMaterial />
        )}
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  // Add your dispatch mappings here
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminActions);

const EmployeeList = () => {
  const employees = [
    { email: "employee1@example.com", password: "password1" },
    { email: "employee2@example.com", password: "password2" },
    { email: "employee3@example.com", password: "password3" },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Remove</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.email}</td>
              <td>{employee.password}</td>
              <td>
                <button>Remove</button>
              </td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Add New Employee</button>
    </div>
  );
};

const EditMaterial = () => {
  const getMaterialList = {
    marble: ["textile1", "textile2", "textile3"],
    aa: ["aa1", "aa2", "aa3"],
    cc: ["cc1", "cc2", "cc3"],
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Material Name</th>
            <th>List</th>
            <th>Remove</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(getMaterialList).map(
            ([materialName, materialList]) => (
              <tr key={materialName}>
                <td>{materialName}</td>
                <td>{materialList.join(", ")}</td>
                <td>
                  <button>Remove</button>
                </td>
                <td>
                  <button>Edit</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <button>Add New Material</button>
    </div>
  );
};

// const EmployeeList = ({ }) => {
//     return (
//       // list of employee like a table -- first column will be email second password and third column to remove the employee and fourth to edit the email and password
//       // below that there will be a add button to add new employee and set a password for them

//     );
//   };

//   const EditMaterial = ({ }) => {
//     return (
//       // list of material like a table -- first column name of the material eg marble and second column will be list eg ["textile1", "textile2", "textile3"]
//       // third column will be to remove them and fourth to edit
//     //     marble: ["textile1", "textile2", "textile3"],
//     //     aa: ["aa1", "aa2", "aa3"],
//     //     cc: ["cc1", "cc2", "cc3"],
//     //   };
//       // below that there will be a add button to add new material and list
//     );
//   };
