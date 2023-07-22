import React, { useState } from "react";
import styled from "styled-components";

// Define the edit modal component
export const EditThirdPartyDetails = ({
  thirdParty,
  customerId,
  name,
  address,
  email,
  phone,
  onSaveChanges,
  onCancel,
}) => {
  const [name_, setName] = useState(name);
  const [address_, setAddress] = useState(address);
  const [email_, setEmail] = useState(email);
  const [phone_, setPhone] = useState(phone);

  const handleSave = () => {
    const updatedData = {
      customerId,
      name_,
      address_,
      email_,
      phone_,
    };
    onSaveChanges(updatedData);
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <h2>EDIT {thirdParty}</h2>
          <InputWrapper>
            <label>Name</label>
            <input
              type="text"
              value={name_}
              onChange={(e) => setName(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Address</label>
            <input
              type="text"
              value={address_}
              onChange={(e) => setAddress(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Email</label>
            <input
              type="text"
              value={email_}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <label>Phone</label>
            <input
              type="text"
              value={phone_}
              onChange={(e) => setPhone(e.target.value)}
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
