import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  background-color: black;
  padding: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputLabel = styled.label``;

const Input = styled.input``;

const Button = styled.button``;

const EditEmployeeModal = ({ isOpen, onClose, employee, onSubmit }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isOpen && employee) {
      setName(employee.employeeName || "");
      setPassword(employee.employeePassword || "");
      setRole(employee.employeeRole || "");
      setIsAdmin(employee.isAdmin || false);
    }
  }, [isOpen, employee]);

  const handleSubmit = () => {
    const updatedEmployee = {
      name: name,
      password: password,
      role: role,
      isAdmin: isAdmin,
    };

    const payload = {
      employeeName: updatedEmployee.name,
      employeeEmail: employee.employeeEmail,
      employeePassword: updatedEmployee.password,
      employeeRole: updatedEmployee.role,
      isAdmin: updatedEmployee.isAdmin,
    };

    onSubmit(payload);
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <h2>Edit Employee</h2>
        <InputLabel>
          Name:{" "}
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputLabel>
        <InputLabel>Email: {employee?.employeeEmail}</InputLabel>

        <InputLabel>
          Password:
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputLabel>
        <InputLabel>
          Role:
          <Input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </InputLabel>
        <InputLabel>
          Admin:
          <Input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </InputLabel>
        <div className="modal-buttons">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default EditEmployeeModal;
