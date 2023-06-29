import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addStoneAPI,
  deleteStoneAPI,
  editStoneAPI,
  getStonesListAPI,
} from "../../actions/index";
import AddStonesModal from "./AddStoneModal";
import EditStonesModal from "./EditStonesModal";
import styled from "styled-components";

const StonesActions = ({
  getStonesList,
  stones,
  addStone,
  editStoneAPI,
  deleteStone,
}) => {
  // states and constants
  const [isAddStonesModalOpen, setIsAddStonesModalOpen] = useState(false);

  const [isEditStonesModalOpen, setIsEditStonesModalOpen] = useState(false);
  const [editingStone, setEditingStone] = useState([]);

  // hooks
  useEffect(() => {
    getStonesList();
  }, [getStonesList]);

  const handleAddNewStone = (payload) => {
    addStone(payload);

    setIsAddStonesModalOpen(false);
  };

  const handleEditingStone = (e, material) => {
    setIsEditStonesModalOpen(true);
    setEditingStone(material);
  };

  const handleEditStone = (payload) => {
    editStoneAPI(payload);

    setIsEditStonesModalOpen(false);
  };

  const handleRemoveStone = (materialName) => {
    const confirmRemove = window.confirm(
      `Are you sure you want to remove the Stone: ${materialName}?`
    );
    if (confirmRemove) {
      const payload = {
        material: materialName,
      };
      deleteStone(payload);
    }
  };

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Category</th>
            <th>Material</th>
            <th>Sizes</th>
            <th>Thicknesses</th>
            <th>Finish</th>
            <th>Bookmatch</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stones)
            .sort(([, stoneA], [, stoneB]) => {
              // Sort by category first
              if (stoneA.category < stoneB.category) return -1;
              if (stoneA.category > stoneB.category) return 1;
              // If category is the same, sort by material
              if (stoneA.material < stoneB.material) return -1;
              if (stoneA.material > stoneB.material) return 1;
              return 0;
            })
            .map(([stoneId, stone], index) => (
              <tr key={stoneId}>
                <td>{index + 1}</td>
                <td>{stone.category}</td>
                <td>{stone.material}</td>
                <td>
                  {stone.sizes && stone.sizes.length > 0
                    ? stone.sizes.join(", ")
                    : ""}
                </td>
                <td>
                  {stone.thicknesses && stone.thicknesses.length > 0
                    ? stone.thicknesses.join(", ")
                    : ""}
                </td>
                <td>{stone.finish}</td>
                <td>
                  {stone.bookmatch ? stone.bookmatch.toString() : "false"}
                </td>
                <td>
                  <button onClick={(e) => handleEditingStone(e, stone)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleRemoveStone(stone.material)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button onClick={() => setIsAddStonesModalOpen(true)}>Add Stones</button>

      <AddStonesModal
        isOpen={isAddStonesModalOpen}
        onClose={() => setIsAddStonesModalOpen(false)}
        onSubmit={handleAddNewStone}
        stones={stones}
      />

      <EditStonesModal
        isOpen={isEditStonesModalOpen}
        onClose={() => setIsEditStonesModalOpen(false)}
        onSubmit={handleEditStone}
        stone={editingStone}
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
    stones: state.stoneState.stones,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // Add your dispatch mappings here
  getStonesList: () => dispatch(getStonesListAPI()),
  addStone: (payload) => dispatch(addStoneAPI(payload)),
  editStoneAPI: (payload) => dispatch(editStoneAPI(payload)),
  deleteStone: (payload) => dispatch(deleteStoneAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StonesActions);
