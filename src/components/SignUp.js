import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getCustomersListAPI, signUpAPI } from "../actions";
import ConsentFormModal from "./ConsentFormModal";
import SignedUpModal from "./SignedUpModal";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import AddressFields from "./signUp/Address";
import Fabricator from "./signUp/Fabricator";
import KitchenAndBath from "./signUp/KitchenAndBath";
import Email from "./signUp/Email";
import Name from "./signUp/Name";
import DesignOrArchitect from "./signUp/DesignOrArchitect";

const SignUp = ({ getCustomersList, customers, signUp, selectedLanguage }) => {
  /*
   * Define states and constants
   */
  // Translation
  const { t } = useTranslation();

  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  // Name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // Email
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userEnteredOtp, setUserEnteredOtp] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  // Phone
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  // Address
  const [addressLine, setAddressLine] = useState("");
  const [aptNo, setAptNo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("USA");
  const [zipCode, setZipCode] = useState("");
  // Fabricator
  const [fabricator, setFabricator] = useState("");
  const [isNotApplicableFabricator, setIsNotApplicableFabricator] =
    useState(false);
  const [f_address, setF_address] = useState("");
  // Kitchen and Bath
  const [kitchen_and_bath, setKitchen_and_bath] = useState("");
  // Designer/Architect
  const [designer_or_architech, setDesigner_or_architech] = useState("");

  // Consent
  const [showConsentModal, setShowConsentModal] = useState("close");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [imageURL, setImageURL] = useState(""); // create a state that will contain our image url

  // SignedUp Successfully
  const [showSignedUpModal, setShowSignedUpModal] = useState("close");

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

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString(); // Get the current date and format it
    setDate(formattedDate); // Set the formatted date to the date state
  }, [date]);

  const handlePhoneChange = (e) => {
    const enteredPhone = e.target.value;
    setPhone(enteredPhone);

    // Regular expression for email validation
    const phoneRegex = /^\d{10}$/;

    if (enteredPhone && !phoneRegex.test(enteredPhone)) {
      setPhoneError(t("phone_error"));
    } else {
      setPhoneError("");
    }
  };

  // Send a custom email
  const sendCustomEmail = (id) => {
    emailjs
      .send(
        "service_0cfzkig",
        "template_uft6mgo",
        {
          receiver_email: email,
          sender_email: "tapadiyams@gmail.com",
          customer_id: id,
        },
        "bhSMpYg94GkNWxePW"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleConsentFormClick = (e) => {
    // if (e.target !== e.currentTarget) {
    //   return;
    // }

    switch (showConsentModal) {
      case "open":
        setShowConsentModal("close");
        break;
      case "close":
        setShowConsentModal("open");
        setImageURL(imageURL); // Reset initials
        setAcceptTerms(acceptTerms); // Reset acceptTerms
        break;
      default:
        setShowConsentModal("close");
    }
  };

  const handleSignedUpModalClick = (e) => {
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

  // Handle SignUp button
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!firstName) {
      showBanner("First name is required.");
      return;
    }
    if (!lastName) {
      showBanner("Last name is required.");
      return;
    }
    if (!email) {
      showBanner("Email is required.");
      return;
    }
    if (!phone) {
      showBanner("Phone is required.");
      return;
    }

    const customerAddress =
      addressLine +
      "," +
      aptNo +
      "," +
      city +
      "," +
      state +
      "," +
      country +
      "," +
      zipCode;

    if (!customerAddress) {
      showBanner("Customer address is required.");
      return;
    }

    if (!acceptTerms) {
      showBanner("You must accept the terms and conditions.");
      return;
    }
    if (!imageURL) {
      showBanner("You must sign to accept the waiver.");
      return;
    }

    if (!isNotApplicableFabricator || fabricator) {
      showBanner("Please provide the name of the fabricator.");
      return;
    }
    if (!isNotApplicableFabricator || f_address) {
      showBanner("Please provide the address of the fabricator.");
      return;
    }

    let newId = customers?.length > 0 ? customers[0].id + 1 : 1;

    const customerPayload = {
      date: date,
      id: newId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: customerAddress,
      kitchen_and_bath: kitchen_and_bath,
      designer_or_architech: designer_or_architech,
      imageURL: imageURL,
    };

    // const fabricatorPayload = {
    //   id: newId,
    //   fabricator: fabricator,
    //   fabricatorAddress: f_address,
    // };

    // Save the payload in the firestore database
    signUp(customerPayload);

    // Set the new id to the new id
    setId(newId);

    // When the sign up is successful, show the message modal and send the custom email
    setShowSignedUpModal("open");
    sendCustomEmail(newId);
  };

  const showBanner = (message) => {
    alert(message);
  };

  return (
    <Container>
      <BackgroundImage src="/images/granite-countertop-1080x600.jpg" alt="" />
      <ContentWrapper>
        <Nav>
          <Title>{t("sign_up_title")}</Title>
        </Nav>

        <SignUpComponent>
          <Form>
            <Name
              selectedLanguage={selectedLanguage}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
            />

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
              isLookUp={false}
            />
            {verificationSuccess && (
              <>
                <Field>
                  <h2> {t("phone")} </h2>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                  {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
                </Field>

                <AddressFields
                  selectedLanguage={selectedLanguage}
                  addressLine={addressLine}
                  setAddressLine={setAddressLine}
                  aptNo={aptNo}
                  setAptNo={setAptNo}
                  city={city}
                  setCity={setCity}
                  state={state}
                  setState={setState}
                  setCountry={setCountry}
                  zipCode={zipCode}
                  setZipCode={setZipCode}
                />

                <Fabricator
                  selectedLanguage={selectedLanguage}
                  fabricator={fabricator}
                  setFabricator={setFabricator}
                  isNotApplicableFabricator={isNotApplicableFabricator}
                  setIsNotApplicableFabricator={setIsNotApplicableFabricator}
                  f_address={f_address}
                  setF_address={setF_address}
                />

                <KitchenAndBath
                  selectedLanguage={selectedLanguage}
                  kitchen_and_bath={kitchen_and_bath}
                  setKitchen_and_bath={setKitchen_and_bath}
                />

                <DesignOrArchitect
                  selectedLanguage={selectedLanguage}
                  designer_or_architech={designer_or_architech}
                  setDesigner_or_architech={setDesigner_or_architech}
                />

                <Field>
                  <Consent>
                    <label htmlFor="consentCheckbox">
                      {t("waiver_terms_1")}
                      <ConcentButton
                        onClick={handleConsentFormClick}
                        className="link-button"
                      >
                        {t("waiver_terms_2")}
                      </ConcentButton>
                    </label>
                  </Consent>
                </Field>
                <SignUpButtonArea>
                  <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
                </SignUpButtonArea>
              </>
            )}
          </Form>
        </SignUpComponent>

        <ConsentFormModal
          showModal={showConsentModal}
          handleCrossClick={handleConsentFormClick}
          setAcceptTerms={setAcceptTerms}
          acceptTerms={acceptTerms}
          setImageURL={setImageURL}
          imageURL={imageURL}
        />

        <SignedUpModal
          showModal={showSignedUpModal}
          handleCrossClick={handleSignedUpModalClick}
          customer_id={id}
          text="You have been successfully Signed Up!"
        />
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Consent = styled.div`
  display: flex;

  label {
    text-decoration: none;
    transition: color 0.3s;
    font-size: large;

    &:hover {
      font-weight: bold;
    }
  }
`;

const ConcentButton = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  color: #cca132;
  transition: color 0.3s;
  font-size: larger;

  &:hover {
    font-weight: bold;
  }
`;

const SignUpButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SignUpButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: #cca132;
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
  color: #fff;
  &:hover {
    background-color: #8c7a26;
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
