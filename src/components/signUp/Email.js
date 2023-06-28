import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import emailjs from "@emailjs/browser";
import SignedUpModal from "../SignedUpModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Email = (props) => {
  /*
   * Define states and constants
   */
  const { t } = useTranslation();
  const [showSignedUpModal, setShowSignedUpModal] = useState("close");
  const [customerId, setCustomerId] = useState("");
  const [existingCustomer, setExistingCustomer] = useState({});
  const history = useHistory();

  /*
   * Define hooks
   */
  useEffect(() => {
    document.body.dir = props.selectedLanguage.dir || "ltr";
  }, [props.selectedLanguage]);

  /*
   * Define functions
   */

  const handleCustomerExistModalClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showSignedUpModal) {
      case "open":
        setShowSignedUpModal("close");
        break;
      case "close":
        setShowSignedUpModal("open");
        break;
      default:
        setShowSignedUpModal("close");
    }
  };

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    props.setEmail(enteredEmail);

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (enteredEmail && !emailRegex.test(enteredEmail)) {
      props.setEmailError(t("email_error"));
    } else {
      props.setEmailError("");
    }
  };

  const sendVerificationEmail = () => {
    // Check if customer already exists
    const existingCustomer = props.customers.find(
      (user) => user.email === props.email
    );

    if (existingCustomer) {
      setExistingCustomer(existingCustomer);
    }

    // For existing customer lookup, if customer does not exist the show a banner
    if (props.isLookup && !existingCustomer) {
      alert(t("customer_does_not_exist_please_check_your_email_address_again"));
      return;
    }

    if (props.isLookup && existingCustomer) {
      setCustomerId(existingCustomer.customerId);

      // open the modal with the customerId
      setShowSignedUpModal("open");
      return;
    }

    // Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    props.setOtp(generatedOtp);

    // Send verification email
    emailjs
      .send(
        "service_1rs8kr6",
        "template_2kfjxmb",
        {
          receiver_email: props.email,
          otp: generatedOtp,
        },
        "WHKLkddJgyNCF7XpA"
      )
      .then(
        (result) => {
          props.setVerificationSent(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const verifyOTP = () => {
    if (parseInt(props.otp) === parseInt(props.userEnteredOtp)) {
      props.setVerificationSuccess(true);
      if (props.isLookup && existingCustomer) {
        history.push(`/customer/${existingCustomer.customerId}`);
        return;
      }
    } else {
      alert("Invalid OTP.");
    }
  };

  return (
    <>
      <Container>
        <Field>
          <h2> {t("email")} </h2>
          <Input
            type="text"
            value={props.email}
            onChange={handleEmailChange}
            placeholder={t("otp_placeholder")}
            disabled={props.verificationSuccess ? true : false}
            required
            error={props.emailError}
          />
          {props.emailError && <ErrorMessage>{props.emailError}</ErrorMessage>}
          {!props.verificationSuccess && (
            <Button onClick={sendVerificationEmail}>
              {t("email_send_otp")}
            </Button>
          )}
        </Field>

        {props.verificationSent && !props.verificationSuccess && (
          <Field>
            <h2>{t("enter_the_otp")}</h2>
            <Input
              type="text"
              value={props.userEnteredOtp}
              onChange={(e) => props.setUserEnteredOtp(e.target.value)}
            />
            <Button onClick={verifyOTP}>{t("email_verify_otp")}</Button>
          </Field>
        )}
      </Container>
      {props.verificationSuccess && (
        <H2 color="yellow">{t("email_verified")}</H2>
      )}

      <SignedUpModal
        showModal={showSignedUpModal}
        handleCrossClick={handleCustomerExistModalClick}
        customerId={customerId}
        text={t("customer_already_exists")}
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const H2 = styled.h2`
  color: #cca132;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
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
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export default Email;
