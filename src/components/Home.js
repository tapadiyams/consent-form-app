import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signUpAPI } from "../actions";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  const history = useHistory();

  const handleNewCustomerClick = () => {
    history.push("/signup");
  };

  return (
    <Container>
      <Nav>
        <a href="/">
          <img src="/images/reliance-stones-ps-logo.jpg" alt="" />
        </a>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to Reliance Stones</h1>
          <img src="/images/mining.png" alt="" />
        </Hero>

        <ButtonContainer>
          <Button>Existing Customer</Button>
          <Button onClick={handleNewCustomerClick}>New Customer</Button>
        </ButtonContainer>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 70px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
    img {
      width: 250px;
      height: 250px;
    }
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 80%;
    font-size: 65px;
    color: #cca132;
    font-weight: 200;
    line-height: 70px;
    margin-top: 100px;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }
  img {
    z-index: 1;
    width: 600px;
    height: 550px;

    // Position it
    position: absolute;
    bottom: -0.2px;
    right: -100px;

    border-radius: 50%;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 30px;
  background-color: #cca132;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  padding: 30px;

  // Some animation
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: #8c7a26;
    color: #ffffff;
  }
`;

const mapStateToProps = (state) => {
  return {
    customers: state.customerState.customers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (payload) => dispatch(signUpAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
