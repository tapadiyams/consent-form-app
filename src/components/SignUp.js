import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getCustomersListAPI, signUpAPI } from "../actions";
import ConsentFormModal from "./ConsentFormModal";
import SignedUpModal from "./SignedUpModal";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

const SignUp = ({ getCustomersList, customers, signUp }) => {
  const { t } = useTranslation();

  // Customer list
  useEffect(() => {
    const fetchData = async () => {
      await getCustomersList(); // Wait for the data to be fetched
    };

    fetchData(getCustomersList());
  }, [getCustomersList]);

  // Define state
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  // const [selectedAddress, setSelectedAddress] = useState("");
  const [fabricator, setFabricator] = useState("");
  const [isNotApplicableFabricator, setIsNotApplicableFabricator] =
    useState(false);
  const [kitchen_and_bath, setKitchen_and_bath] = useState("");
  const [designer_or_architech, setDesigner_or_architech] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  const [showSignedUpModal, setShowSignedUpModal] = useState("close");

  const handleCheckboxChange = () => {
    setIsNotApplicableFabricator(!isNotApplicableFabricator);
  };

  // Date
  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString(); // Get the current date and format it
    setDate(formattedDate); // Set the formatted date to the date state
  }, [date]);

  // Consent state
  const [showModal, setShowModal] = useState("close");
  const [initials, setInitials] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleConsentFormClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        setInitials(initials); // Reset initials
        setAcceptTerms(acceptTerms); // Reset acceptTerms
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
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

  // Send a custome email
  const sendEmail = () => {
    console.log("Sending an email");
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
    // if (!selectedAddress) {
    //   showBanner("Address is required.");
    //   return;
    // }
    if (!acceptTerms) {
      showBanner("You must accept the terms and conditions.");
      return;
    }

    let newId = customers?.length > 0 ? customers[0].id + 1 : 1;

    const payload = {
      date: date,
      id: newId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      // address: "selectedAddress",
      fabricator: fabricator,
      kitchen_and_bath: kitchen_and_bath,
      designer_or_architech: designer_or_architech,
    };

    signUp(payload);

    setId(newId);

    setShowSignedUpModal("open");

    // send a custom email
    sendEmail();
  };

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (enteredEmail && !emailRegex.test(enteredEmail)) {
      setEmailError(t("email_error"));
    } else {
      setEmailError("");
    }
  };

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

  const handleFabricatorChange = (e) => {
    isNotApplicableFabricator
      ? setFabricator("N/A")
      : setFabricator(e.event.value);
  };

  const showBanner = (message) => {
    alert(message);
  };

  return (
    <Container>
      <Nav>
        <Title>{t("sign_up_title")}</Title>
      </Nav>

      <SignUpComponent>
        <Form>
          <Field>
            <h2> {t("first_name")} </h2>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Field>
          <Field>
            <h2> {t("last_name")} </h2>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Field>
          <Field>
            <h2> {t("email")} </h2>
            <Input
              type="text"
              value={email}
              onChange={handleEmailChange}
              required
              error={emailError}
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </Field>

          <Field>
            <h2> {t("phone")} </h2>
            <Input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            {/* <button onClick={getOtp}>Send OTP</button> */}
            {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
          </Field>
          {/* <Field>
            <h2> {t("address")} </h2>
            <Autocomplete
              apiKey={AUTO_ADDRESS_API_KEY}
              onPlaceSelected={(place) => {
                console.log(place);
                setSelectedAddress(place.value);
              }}
            />
          </Field> */}
          <Field>
            <h2>{t("fabricator")}</h2>
            <Input
              type="text"
              value={fabricator}
              onChange={handleFabricatorChange}
              disabled={isNotApplicableFabricator}
            />
            <CheckboxContainer>
              <input
                type="checkbox"
                id="notApplicableCheckbox"
                checked={isNotApplicableFabricator}
                onChange={handleCheckboxChange}
              />
              <CheckboxLabel htmlFor="notApplicableCheckbox">
                {t("not_applicable")}
              </CheckboxLabel>
            </CheckboxContainer>
          </Field>
          <Field>
            <h2> {t("kitchen_and_bath")} </h2>
            <Input
              type="kitchen_and_bath"
              value={kitchen_and_bath}
              onChange={(e) => setKitchen_and_bath(e.target.value)}
            />
          </Field>
          <Field>
            <h2> {t("designer_or_architech")} </h2>
            <Input
              type="text"
              value={designer_or_architech}
              onChange={(e) => setDesigner_or_architech(e.target.value)}
            />
          </Field>
          <Field>
            <Consent>
              <label htmlFor="consentCheckbox">
                {t("waiver_terms_1")}{" "}
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
        </Form>
      </SignUpComponent>

      <ConsentFormModal
        showModal={showModal}
        handleCrossClick={handleConsentFormClick}
        setAcceptTerms={setAcceptTerms}
        setInitials={setInitials}
        initialAcceptTerms={acceptTerms} // Pass the acceptTerms state here
        initialInitials={initials} // Pass the initials state here
      />

      <SignedUpModal
        showModal={showSignedUpModal}
        handleCrossClick={handleSignedUpModalClick}
        customer_id={id}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
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

// const DropdownMenu = styled.ul`
//   position: absolute;
//   top: 0;
//   right: 0;
//   list-style-type: none;
//   padding: 0;
//   margin: 0;
// `;

// const DropdownButton = styled.button`
//   margin-top: 10px;
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
// `;

// const DropdownContent = styled.div`
//   position: absolute;
//   top: 100%;
//   right: 10px;
//   display: ${({ isOpen }) => (isOpen ? "block" : "none")};
//   background-color: #fff;
//   padding: 8px;
//   border-radius: 4px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   z-index: 1;
// `;

// const DropdownMenuItem = styled.li`
//   padding: 10px;
//   cursor: pointer;

//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

// const DropdownItemLink = styled.a`
//   color: black;
// `;

const ConcentButton = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
  color: yellow;
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
  width: 40%;
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
  text-align: center;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  margin-left: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Consent = styled.div`
  display: flex;

  label {
    a {
      color: #cca132; /* Change link color to #cca132 */
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        font-weight: bold; /* Make it bold on hover */
      }
    }
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
