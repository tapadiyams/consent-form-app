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

const SizeItem = styled.div`
  display: flex;
  align-items: center;
`;

const ThicknessItem = styled.div`
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  margin-left: 5px;
`;

const EditStonesModal = ({ isOpen, onClose, stone, onSubmit }) => {
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [thicknesses, setThicknesses] = useState([]);
  const [thicknessInput, setThicknessInput] = useState("");
  const [finish, setFinish] = useState("");
  const [bookmatch, setBookmatch] = useState(false);

  useEffect(() => {
    if (isOpen && stone) {
      setSizes(stone.sizes || []);
      setThicknesses(stone.thicknesses || []);
      setFinish(stone.finish || "");
      setBookmatch(stone.bookmatch || false);
    }
  }, [isOpen, stone]);

  const handleAddSize = () => {
    if (sizeInput) {
      setSizes((prevSizes) => [...prevSizes, sizeInput.trim()]);
      setSizeInput("");
    }
  };

  const handleRemoveSize = (index) => {
    setSizes((prevSizes) => prevSizes.filter((_, i) => i !== index));
  };

  const handleAddThickness = () => {
    if (thicknessInput) {
      setThicknesses((prevThicknesses) => [
        ...prevThicknesses,
        thicknessInput.trim(),
      ]);
      setThicknessInput("");
    }
  };

  const handleRemoveThickness = (index) => {
    setThicknesses((prevThicknesses) =>
      prevThicknesses.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = () => {
    const updatedMaterial = {
      sizes: sizes,
      thicknesses: thicknesses,
      finish: finish,
      bookmatch: bookmatch,
    };

    const payload = {
      material: stone.material,
      sizes: updatedMaterial.sizes,
      thicknesses: updatedMaterial.thicknesses,
      finish: updatedMaterial.finish,
      bookmatch: updatedMaterial.bookmatch,
    };

    onSubmit(payload);
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <h2>Edit Stone</h2>
        <InputLabel>Material: {stone?.material}</InputLabel>
        <InputLabel>
          Sizes:
          <Input
            type="text"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
          />
          <Button onClick={handleAddSize}>Add Size</Button>
          {sizes.map((size, index) => (
            <SizeItem key={index}>
              {size}
              <RemoveButton onClick={() => handleRemoveSize(index)}>
                Remove
              </RemoveButton>
            </SizeItem>
          ))}
        </InputLabel>
        <InputLabel>
          Thickness:
          <Input
            type="text"
            value={thicknessInput}
            onChange={(e) => setThicknessInput(e.target.value)}
          />
          <Button onClick={handleAddThickness}>Add Thickness</Button>
          {thicknesses.map((thickness, index) => (
            <ThicknessItem key={index}>
              {thickness}
              <RemoveButton onClick={() => handleRemoveThickness(index)}>
                Remove
              </RemoveButton>
            </ThicknessItem>
          ))}
        </InputLabel>
        <InputLabel>
          Finish:
          <Input
            type="text"
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
          />
        </InputLabel>
        <InputLabel>
          Bookmatch:
          <Input
            type="checkbox"
            checked={bookmatch}
            onChange={(e) => setBookmatch(e.target.checked)}
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

export default EditStonesModal;
