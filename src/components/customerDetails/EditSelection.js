import React, { useState } from "react";
import styled from "styled-components";

// Define the edit modal component
export const EditSelection = ({
  customerId,
  selectionId,
  oldPricing,
  oldNote,
  onSaveChanges,
  onCancel,
}) => {
  console.log("Shubham, editSelec:", oldPricing, oldNote);
  const [pricing, setPricing] = useState(oldPricing);
  const [note, setNote] = useState(oldNote);

  const handleSave = () => {
    const updatedData = {
      customerId,
      selectionId,
      pricing,
      note,
    };
    onSaveChanges(updatedData);
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <h2>EDIT SELECTION</h2>
          <InputWrapper>
            <label>Selection ID</label>
            <input type="text" value={selectionId} disabled />
          </InputWrapper>
          <InputWrapper>
            <label>Pricing</label>
            <input
              type="text"
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Note</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
