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

const AddStoneModal = ({ isOpen, onClose, onSubmit, stones }) => {
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [thicknesses, setThicknesses] = useState([]);
  const [thicknessInput, setThicknessInput] = useState("");
  const [finish, setFinish] = useState("");
  const [bookmatch, setBookmatch] = useState(false);

  // Reset all the useState values
  const resetUseStates = () => {
    setMaterial("");
    setSizes([]);
    setSizeInput("");
    setThicknesses([]);
    setThicknessInput("");
    setFinish("");
    setBookmatch(false);
  };

  const handleAddSize = () => {
    if (sizeInput) {
      setSizes((prevSizes) => [...prevSizes, sizeInput.trim()]);
      setSizeInput("");
    }
  };

  const handleRemoveSize = (index) => {
    setSizes((prevSizes) => prevSizes.filter((_, i) => i !== index));
  };

  const handleAddThicknesses = () => {
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
    if (!category) {
      alert("Category of the stone is required!");
      return;
    }

    if (!material) {
      alert("Name of the stone is required!");
      return;
    }

    if (sizeInput) {
      alert("Please hit the Add Size button if you want to add the size.");
      return;
    }

    if (thicknessInput) {
      alert(
        "Please hit the Add Thickness button if you want to add the thickness."
      );
      return;
    }

    const stone = Object.values(stones).find(
      (s) => s.material.toLowerCase() === material.toLowerCase()
    );

    if (stone) {
      alert(
        `This stone already exists. To make any new changes to the ${material}, go to its "Edit".`
      );
      return;
    }

    const payload = {
      category: category,
      material: material,
      sizes: sizes,
      thicknesses: thicknesses,
      finish: finish,
      bookmatch: bookmatch,
    };

    onSubmit(payload);
    resetUseStates();
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <h2>Add New Stone</h2>
        <InputLabel>
          Category:
          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </InputLabel>
        <InputLabel>
          Material:
          <Input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
        </InputLabel>
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
          <Button onClick={handleAddThicknesses}>Add Thickness</Button>
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
          <Button onClick={handleSubmit}>Add Stone</Button>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default AddStoneModal;
