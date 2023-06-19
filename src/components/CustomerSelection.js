import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const getMaterialList = {
  marble: ["textile1", "textile2", "textile3"],
  aa: ["aa1", "aa2", "aa3"],
  cc: ["cc1", "cc2", "cc3"],
};

const CustomerSelection = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };
  const handleRemoveFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };
  const handleToggleCartVisibility = () => {
    setCartVisible(!isCartVisible);
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [size, setSize] = useState("");
  const [lot, setLot] = useState("");
  const [color, setColor] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedOption(null);
    setSize("");
    setLot("");
    setColor("");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleLotChange = (event) => {
    setLot(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleAddButtonClick = () => {
    // Perform desired action when "add" button is clicked
    console.log("Add button clicked");
    console.log("Selected category:", selectedCategory);
    console.log("Selected option:", selectedOption);
    console.log("Size:", size);
    console.log("Lot:", lot);
    console.log("Color:", color);

    // Create an object or string with the selected options
    const selectedItem = {
      category: selectedCategory,
      option: selectedOption,
      size,
      lot,
      color,
    };

    // Add the selected item to the cartItems array
    setCartItems([...cartItems, selectedItem]);
  };

  return (
    <Container>
      <Menu>
        {Object.keys(getMaterialList).map((category) => (
          <MenuItem
            key={category}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>

      {selectedCategory && (
        <Menu>
          {getMaterialList[selectedCategory].map((option) => (
            <MenuItem key={option} onClick={() => handleOptionSelect(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      )}

      {selectedOption && (
        <SelectionContainer>
          <SelectionLabel>Size:</SelectionLabel>
          <SelectionInput
            type="text"
            value={size}
            onChange={handleSizeChange}
          />

          <SelectionLabel>Lot:</SelectionLabel>
          <SelectionInput type="text" value={lot} onChange={handleLotChange} />

          <SelectionLabel>Color:</SelectionLabel>
          <SelectionInput
            type="text"
            value={color}
            onChange={handleColorChange}
          />

          <AddButton onClick={handleAddButtonClick}>Add</AddButton>
        </SelectionContainer>
      )}

      {/* Cart Icon */}
      <CartIcon onClick={handleToggleCartVisibility}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <CartItemCount>{cartItems.length}</CartItemCount>
      </CartIcon>

      {/* Cart */}
      {isCartVisible && (
        <Cart
          cartItems={cartItems}
          handleRemoveFromCart={handleRemoveFromCart}
        />
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
  flex-direction: column; /* Set the flex direction to column */
  align-items: flex-start; /* Align items to the start of the container */
`;

const MenuItem = styled.li`
  width: 200px;
  height: 30px;
  border: 1px solid gray;
  text-align: center;
  display: inline-block;
  font-size: 25px; /* Updated font size */
  padding: 10px;
  cursor: pointer;
  background-color: lightgray;
  margin-right: 5px;

  &:hover {
    background-color: gray;
  }
`;

const SelectionContainer = styled.div`
  margin-top: 20px;
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
  /* Add your styles here */
`;

const CartItemCount = styled.span`
  /* Add your styles here */
`;

const CartContainer = styled.div`
  /* Add your styles here */
`;

const CartTitle = styled.h2`
  /* Add your styles here */
`;

const CartItems = styled.ul`
  /* Add your styles here */
`;

const CartItem = styled.li`
  /* Add your styles here */
`;

const ItemName = styled.span`
  /* Add your styles here */
`;

const RemoveButton = styled.button`
  /* Add your styles here */
`;

const EmptyCartMessage = styled.p`
  /* Add your styles here */
`;

const mapStateToProps = (state) => {
  return {
    // isAdmin: true,
    // isEmployee: true,
    // employee: state.userState.employee,
    // getMaterialList: state.material.materials,
  };
};

const mapDispatchToProps = (dispatch) => ({
  //   signUp: (payload) => dispatch(signUpAPI(payload)),
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
              <ItemName>{item.option}</ItemName>
              <ItemName>{item.size}</ItemName>
              <ItemName>{item.lot}</ItemName>
              <ItemName>{item.color}</ItemName>
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
