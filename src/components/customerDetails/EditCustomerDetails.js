import React, { useState } from "react";
import styled from "styled-components";

// Define the edit modal component
export const EditCustomerDetails = ({ customer, onSaveChanges, onCancel }) => {
  const [name, setName] = useState(
    customer.firstName + " " + customer.lastName
  );
  const [phone, setPhone] = useState(customer.phone);
  const [email, setEmail] = useState(customer.email);
  const [address, setAddress] = useState(customer.address);

  const handleSave = () => {
    const updatedData = {
      ...customer,
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      phone,
      email,
      address,
    };
    onSaveChanges(updatedData);
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <h2>EDIT CUSTOMER</h2>
          <InputWrapper>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </InputWrapper>
          <ButtonWrapper>
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </ButtonWrapper>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

// Define the styled components for the modal and overlay
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); // Semi-transparent black background
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: black;
  width: 500px;
  height: 400px;
  border-radius: 8px;
  padding: 20px;
`;

const ModalContent = styled.div`
  h2 {
    margin-bottom: 20px; // Add margin-bottom for spacing
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 10px; // Add margin-bottom for spacing
  label {
    margin-right: 10px; // Add margin-right for spacing between label and input
  }
`;

const ButtonWrapper = styled.div``;
