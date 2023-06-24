import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getCustomersListAPI, signUpAPI } from "../actions";
import { useTranslation } from "react-i18next";
import Email from "./signUp/Email";

const ExistingCustomer = ({
  getCustomersList,
  selectedLanguage,
  customers,
}) => {
  /*
   * Define states and constants
   */
  // Translation
  const { t } = useTranslation();
  // Email
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userEnteredOtp, setUserEnteredOtp] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  /*
   * Define hooks
   */
  useEffect(() => {
    document.body.dir = selectedLanguage.dir || "ltr";
  }, [selectedLanguage]);

  useEffect(() => {
    const fetchData = async () => {
      await getCustomersList(); // Wait for the data to be fetched
    };

    fetchData(getCustomersList());
  }, [getCustomersList]);

  return (
    <Container>
      <BackgroundImage src="/images/granite-countertop-1080x600.jpg" alt="" />
      <ContentWrapper>
        <Nav>
          <Title>{t("look_up")}</Title>
        </Nav>

        <SignUpComponent>
          <Form>
            <Email
              selectedLanguage={selectedLanguage}
              email={email}
              setEmail={setEmail}
              otp={otp}
              setOtp={setOtp}
              userEnteredOtp={userEnteredOtp}
              setUserEnteredOtp={setUserEnteredOtp}
              verificationSent={verificationSent}
              setVerificationSent={setVerificationSent}
              verificationSuccess={verificationSuccess}
              setVerificationSuccess={setVerificationSuccess}
              emailError={emailError}
              setEmailError={setEmailError}
              customers={customers}
              isLookup={true}
            />
          </Form>
        </SignUpComponent>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div``;

const BackgroundImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 100%;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #cca132;
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SignUpComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  padding: 15px;

  height: 100%;
  width: 50%;
  gap: 20px;
`;

const mapStateToProps = (state) => {
  return {
    customers: state.customerState.customers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (payload) => dispatch(signUpAPI(payload)),
  getCustomersList: () => dispatch(getCustomersListAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExistingCustomer);
