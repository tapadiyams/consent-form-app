import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addEmployeeAPI,
  deleteEmployeeAPI,
  editEmployeeAPI,
  getEmployeesListAPI,
} from "../../actions/index";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import styled from "styled-components";

const EmployeesActions = (props) => {
  // states and constants
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState([]);

  // hooks
  useEffect(() => {
    const { getEmployeesList } = props; // Destructure getEmployeesList from props

    const fetchEmployeesList = async () => {
      await getEmployeesList();
    };

    fetchEmployeesList();
  }, [props]); // Include props in the dependency array if needed for other parts of the component

  const handleAddNewEmployee = (payload) => {
    const existingEmployee =
      props.employees &&
      Object.values(props.employees).find(
        (e) => e.employeeEmail && e.employeeEmail === payload.employeeEmail
      );

    if (existingEmployee) {
      alert(`Employee ${existingEmployee.employeeEmail} already exists.`);
      return;
    }
    props.addEmployee(payload);

    setIsAddEmployeeModalOpen(false);
  };

  const handleEditingEmployee = (e, employee) => {
    setIsEditEmployeeModalOpen(true);
    setEditingEmployee(employee);
  };

  const handleEditEmployee = (payload) => {
    props.editEmployeeAPI(payload);

    setIsEditEmployeeModalOpen(false);
  };

  const handleRemoveEmployee = (employeeEmail) => {
    const confirmRemove = window.confirm(
      `Are you sure you want to remove the employee: ${employeeEmail}?`
    );
    if (confirmRemove) {
      const payload = {
        employeeEmail: employeeEmail,
      };
      props.deleteEmployee(payload);
    }
  };

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Permission</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {props.employees &&
            Object.entries(props.employees).map(([employeeId, employee]) => (
              <tr key={employeeId}>
                <td>{parseInt(employeeId) + 1}</td>
                <td>
                  {employee && employee.employeeName
                    ? employee.employeeName
                    : ""}
                </td>
                <td>
                  {employee && employee.employeeEmail
                    ? employee.employeeEmail
                    : ""}
                </td>
                <td>
                  {employee && employee.employeePassword
                    ? employee.employeePassword
                    : ""}
                </td>
                <td>
                  {employee && employee.employeeRole
                    ? employee.employeeRole
                    : ""}
                </td>
                <td>
                  {employee && employee.employeePermission
                    ? employee.employeePermission
                    : ""}
                </td>

                <td>
                  <button onClick={(e) => handleEditingEmployee(e, employee)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveEmployee(employee.employeeEmail)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button onClick={() => setIsAddEmployeeModalOpen(true)}>
        Add Employee
      </button>

      <AddEmployeeModal
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
        onSubmit={handleAddNewEmployee}
        employees={props.employees}
      />

      <EditEmployeeModal
        isOpen={isEditEmployeeModalOpen}
        onClose={() => setIsEditEmployeeModalOpen(false)}
        onSubmit={handleEditEmployee}
        employee={editingEmployee}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const mapStateToProps = (state) => {
  return {
    // Add your state mappings here
    employees: state.stoneState.employees,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // Add your dispatch mappings here
  addEmployee: (payload) => dispatch(addEmployeeAPI(payload)), // Create
  getEmployeesList: () => dispatch(getEmployeesListAPI()), // Read
  editEmployeeAPI: (payload) => dispatch(editEmployeeAPI(payload)), // Update
  deleteEmployee: (payload) => dispatch(deleteEmployeeAPI(payload)), // Delete
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesActions);
