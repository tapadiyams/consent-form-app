import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signUpAPI } from "../actions";
import { Redirect } from "react-router-dom";
import ConsentFormModal from "./ConsentFormModal";

const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [consentChecked, setConsentChecked] = useState(true);

  const [showModal, setShowModal] = useState("close");

  const consentFormClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
    }
  };

  return (
    <Container>
      {props.user && <Redirect to="/home" />}
      <Nav>
        <a href="/">
          <img src="/images/reliance-stones-ps-logo.png" alt="" />
        </a>
        <div>
          {/* <Join>Join now</Join> */}
          <SignIn>Log In</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to Reliance Stones</h1>
          <img src="/images/mining.png" alt="" />
        </Hero>
        <SignUpComponent>
          <Input
            type="first-name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="last-name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="address"
            placeholder="Address (Optional)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Consent>
            <input
              type="checkbox"
              id="consentCheckbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              required
            />
            <label htmlFor="consentCheckbox">
              I consent to{" "}
              <a href="#" onClick={consentFormClick}>
                Waiver and Release indemnity agreement
              </a>
            </label>
          </Consent>

          <SignUpButtonArea>
            <SignUpButton onClick={() => props.signUp()}>Sign Up</SignUpButton>
          </SignUpButtonArea>
        </SignUpComponent>
      </Section>
      <ConsentFormModal showModal={showModal} handleClick={consentFormClick} />
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
      width: 135px;
      height: 70px;
    }
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
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
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }
  img {
    z-index: 1;
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    border-radius: 50%;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const SignUpComponent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 70px;

  width: 400%;
`;

const Input = styled.input`
  height: 40px;
  width: 408px;
  background-color: #fff;

  height: 56px;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;

  text-align: center;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
`;

const Consent = styled.div`
  display: flex;
`;

const SignUpButtonArea = styled.div`
  margin-left: 60px;
  width: 300px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const SignUpButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: #2977c9;
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signUp: () => dispatch(signUpAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
