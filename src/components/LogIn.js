import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteCustomersAPI,
  getCustomersListAPI,
  getWebsiteCredentialsAPI,
} from "../actions";

const LogIn = ({
  getWebsiteCredentials,
  websiteCredentials,
  setHasWebsiteAccess,
  getCustomers,
  deleteCustomers,
  customers,
  emailError,
}) => {
  const [websiteUserName, setWebsiteUserName] = useState("");
  const [websitePassword, setWebsitePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const history = useHistory();

  useEffect(() => {
    getWebsiteCredentials();
  }, [getWebsiteCredentials]);

  useEffect(() => {
    async function fetchData() {
      await getCustomers();
      await deleteCustomers(customers);
    }
    fetchData();
  }, [deleteCustomers, customers, getCustomers]);

  const verifyWebsiteCredentials = () => {
    if (!websiteUserName) {
      alert("User name cannot be empty.");
      return;
    }

    if (!websitePassword) {
      alert("Password cannot be empty.");
      return;
    }

    if (websiteCredentials[0].websiteUserName !== websiteUserName) {
      alert("User name is wrong.");
      return;
    }

    if (websiteCredentials[0].websitePassword !== websitePassword) {
      alert("Password is wrong.");
      return;
    }

    setHasWebsiteAccess(true);
    history.push("/home");
  };

  return (
    <Container>
      <BackgroundImage src="/images/granite-countertop-1080x600.jpg" alt="" />
      <RelianceImage>
        <img src="/images/reliancewhite.png" alt="" />
      </RelianceImage>
      <Field>
        <H2>USER NAME</H2>
        <Input
          type="text"
          value={websiteUserName}
          onChange={(e) => setWebsiteUserName(e.target.value)}
          required
          error={emailError}
        />
      </Field>

      <Field>
        <H2>PASSWORD</H2>
        <Input
          type={showPassword ? "text" : "password"}
          value={websitePassword}
          onChange={(e) => setWebsitePassword(e.target.value)}
        />
        <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide Password" : "Show Password"}
        </PasswordToggle>
        <Button onClick={verifyWebsiteCredentials}>ENTER THE WEBSITE</Button>
      </Field>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 10px;
`;

const BackgroundImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  object-fit: cover;
`;

const RelianceImage = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  & > img {
    width: 350px;
    height: 200px;
  }
`;

const H2 = styled.h2`
  color: #cca132;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 30%;
  z-index: 1;
`;

const Input = styled.input`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;
  padding: 10px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
`;

const PasswordToggle = styled.div`
  color: #50c878;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`;

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const Button = styled.button`
  height: 40px;
  background-color: #50c878;
  color: white;
  font-size: 20px;
  cursor: pointer;

  :hover {
    background: #cca132;
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

const mapStateToProps = (state) => {
  return {
    websiteCredentials: state.stoneState.websiteCredentials,
    customers: state.customerState.customers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getWebsiteCredentials: () => dispatch(getWebsiteCredentialsAPI()),
  getCustomers: () => dispatch(getCustomersListAPI()),
  deleteCustomers: (customersList) =>
    dispatch(deleteCustomersAPI(customersList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
