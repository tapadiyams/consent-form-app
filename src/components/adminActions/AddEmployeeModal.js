import React, { useState } from "react";
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

const Button = styled.button``;

const AddEmployeeModal = ({ isOpen, onClose, onSubmit, employees }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [employeePermission, setEmployeePermission] = useState("");

  const [emailError, setEmailError] = useState(false);

  // Reset all the useState values
  const resetUseStates = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setEmployeePermission("");
  };

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (enteredEmail && !emailRegex.test(enteredEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = () => {
    if (!name) {
      alert("Name of employee is required!");
      return;
    }

    if (!email) {
      alert("Email of employee is required!");
      return;
    }

    if (!password) {
      alert("Password of employee is required!");
      return;
    }

    const employee =
      employees &&
      Object.values(employees).find(
        (e) => e.name && e.name.toLowerCase() === name.toLowerCase()
      );

    if (employee) {
      alert(
        `This employee already exists. To make any new changes to the ${name}, go to its "Edit".`
      );
      return;
    }

    const payload = {
      employeeName: name,
      employeeEmail: email,
      employeePassword: password,
      employeeRole: role,
      employeePermission: employeePermission,
    };

    onSubmit(payload);
    resetUseStates();
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <h2>Add New Employee</h2>
        <InputLabel>
          Name:
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputLabel>
        <InputLabel>
          Email:
          <Input type="text" value={email} onChange={handleEmailChange} />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputLabel>
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
          Permission:
          <Input
            type="number"
            checked={employeePermission}
            onChange={(e) => setEmployeePermission(e.target.value)}
          />
        </InputLabel>
        <div className="modal-buttons">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Employee</Button>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default AddEmployeeModal;
