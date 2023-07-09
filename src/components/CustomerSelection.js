import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  addSelectionsAPI,
  editCustomerAPI,
  getCustomersListAPI,
  getStonesListAPI,
} from "../actions";
import { useParams, useHistory } from "react-router-dom";

const CustomerSelection = ({
  getCustomersList,
  addSelection,
  getStonesList,
  stonesList,
  customers,
  editCustomer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [size, setSize] = useState("");
  const [thickness, setThickness] = useState("");
  const [finish, setFinish] = useState("");
  const [note, setNote] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedThickness, setSelectedThickness] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [materialSearch, setMaterialSearch] = useState("");

  const employeeName = localStorage.getItem("employeeName") || "";

  const employeePermission = localStorage.getItem("employeePermission") || "";

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      await getCustomersList();
      await getStonesList();
    };

    fetchData();
  }, [getCustomersList, getStonesList]);

  const { id } = useParams();
  const customerId = parseInt(id, 10);
  const customer = customers.find(
    (customer) => customer.customerId === customerId
  );

  const resetCart = () => {
    setCartItems([]);
    resetSelection();
    setCartVisible(false);
  };

  const resetSelection = () => {
    setSelectedCategory(null);
    setSelectedMaterial(null);
    setSize("");
    setThickness("");
    setFinish("");
    setNote("");
  };

  const handleRemoveFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const handleToggleCartVisibility = () => {
    setCartVisible(!isCartVisible);
  };

  const handleFinalizeItems = async () => {
    for (const selectedItem of cartItems) {
      await addSelection(selectedItem);
    }

    if (!customer.assistedBy) {
      await editCustomer({ customerId, employeeName });
    }

    history.goBack();
    resetCart();
  };

  const handleCancel = () => {
    history.goBack();
    resetCart();
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedMaterial(null);
    setSelectedSize(null);
    setSelectedThickness(null);
    setFinish("");
    setNote("");
  };

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
    setSelectedSize(null);
    setSelectedThickness(null);
    setFinish("");
    setNote("");
  };

  const handleFinishChange = (event) => {
    setFinish(event.target.value);
  };

  const handleAddButtonClick = () => {
    const selectedItem = {
      customerId: customerId,
      category: selectedCategory,
      material: selectedMaterial,
      size: size,
      thickness: thickness,
      finish: finish,
      note: note,
    };

    setCartItems([...cartItems, selectedItem]);

    resetSelection();
  };

  // Group the stones by category
  const groupedStones = stonesList.reduce((acc, stone) => {
    if (acc[stone.category]) {
      acc[stone.category].push(stone);
    } else {
      acc[stone.category] = [stone];
    }
    return acc;
  }, {});

  // Filter stones based on category search
  const filteredCategories = Object.keys(groupedStones).filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Filter stones based on material search
  const filteredMaterials =
    selectedCategory &&
    groupedStones[selectedCategory].filter((stone) =>
      stone.material.toLowerCase().includes(materialSearch.toLowerCase())
    );

  return (
    <Container>
      {(employeePermission === "1" || employeePermission === "2") && (
        <>
          <Menu>
            <SearchInput
              type="text"
              placeholder="Search category"
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
            />
            {filteredCategories.map((category) => (
              <MenuItem
                key={category}
                onClick={() => handleCategorySelect(category)}
                selected={selectedCategory === category}
              >
                {category}
              </MenuItem>
            ))}
          </Menu>

          {selectedCategory && (
            <Menu>
              <SearchInput
                type="text"
                placeholder="Search material"
                value={materialSearch}
                onChange={(e) => setMaterialSearch(e.target.value)}
              />
              {filteredMaterials.map((stone) => (
                <MenuItem
                  key={stone.material}
                  onClick={() => handleMaterialSelect(stone.material)}
                  selected={selectedMaterial === stone.material}
                >
                  {stone.material}
                </MenuItem>
              ))}
            </Menu>
          )}

          {selectedMaterial && (
            <Menu>
              {stonesList
                .find((stone) => stone.material === selectedMaterial)
                ?.sizes?.map((size) => (
                  <MenuItem
                    key={size}
                    onClick={() => {
                      setSize(size);
                      setSelectedSize(size);
                    }}
                    selected={size === selectedSize}
                  >
                    {size}
                  </MenuItem>
                ))}
            </Menu>
          )}

          {selectedMaterial && (
            <Menu>
              {stonesList
                .find((stone) => stone.material === selectedMaterial)
                ?.thicknesses?.map((thickness) => (
                  <MenuItem
                    key={thickness}
                    onClick={() => {
                      setThickness(thickness);
                      setSelectedThickness(thickness);
                    }}
                    selected={thickness === selectedThickness}
                  >
                    {thickness}
                  </MenuItem>
                ))}
            </Menu>
          )}

          {selectedMaterial && (
            <SelectionContainer>
              <SelectionLabel>Finish:</SelectionLabel>
              <SelectionInput
                type="text"
                value={finish}
                onChange={handleFinishChange}
              />

              <SelectionLabel>Note:</SelectionLabel>
              <SelectionInput
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />

              <AddButton onClick={handleAddButtonClick}>Add</AddButton>
            </SelectionContainer>
          )}

          <CartIcon onClick={handleToggleCartVisibility}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <CartItemCount>{cartItems.length}</CartItemCount>
          </CartIcon>

          {isCartVisible && (
            <Cart
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          )}

          <ButtonContainer>
            <Button onClick={handleFinalizeItems}>Finalize Items</Button>
            <Button onClick={handleCancel}>Go Back</Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 8px;
  margin-bottom: 10px;
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
  white-space: nowrap; /* Prevent line break */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis; /* Display ellipsis for overflow */
  background-color: ${(props) =>
    props.selected
      ? "gray"
      : "lightgray"}; // Set background color based on selected prop
  margin-right: 5px;

  &:hover {
    background-color: gray;
  }
`;

const SelectionContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const SelectionLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const SelectionInput = styled.input`
  width: 200px;
  margin-bottom: 10px;
`;

const AddButton = styled.button`
  padding: 5px 10px;
`;

const CartIcon = styled.div`
  top: 0;
  right: 0;
`;

const CartItemCount = styled.span``;

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
`;

const CartContainer = styled.div``;

const CartTitle = styled.h2``;

const CartItems = styled.ul``;

const CartItem = styled.li``;

const ItemName = styled.span`
  padding: 10px;
`;

const RemoveButton = styled.button``;

const EmptyCartMessage = styled.p``;

const mapStateToProps = (state) => {
  return {
    customers: state.customerState.customers,
    stonesList: state.stoneState.stones,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCustomersList: () => dispatch(getCustomersListAPI()),
  getStonesList: () => dispatch(getStonesListAPI()),
  addSelection: (selectedItem) => dispatch(addSelectionsAPI(selectedItem)),
  editCustomer: (payload) => dispatch(editCustomerAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSelection);

const Cart = ({ cartItems, handleRemoveFromCart }) => {
  return (
    <CartContainer>
      <CartTitle>Cart</CartTitle>
      {cartItems.length > 0 ? (
        <CartItems>
          {cartItems.map((item, index) => (
            <CartItem key={index}>
              <ItemName>{item.category}</ItemName>
              <ItemName>{item.material}</ItemName>
              <ItemName>{item.size}</ItemName>
              <ItemName>{item.thickness}</ItemName>
              <ItemName>{item.finish}</ItemName>
              <ItemName>{item.note}</ItemName>
              <RemoveButton onClick={() => handleRemoveFromCart(index)}>
                Remove
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>
      ) : (
        <EmptyCartMessage>Your cart is empty</EmptyCartMessage>
      )}
    </CartContainer>
  );
};
