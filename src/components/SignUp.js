import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getCustomersListAPI, signUpAPI } from "../actions";
import ConsentFormModal from "./ConsentFormModal";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import SignedUpModal from "./SignedUpModal";

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "sp",
    name: "Spanish",
    country_code: "sp",
  },
];

const GlobeIcon = ({ width = 35, height = 35 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="#fff"
    className="bi bi-globe"
    viewBox="0 0 16 16"
  >
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
  </svg>
);

const SignUp = ({ getCustomersList, customers, signUp }) => {
  // For Language change
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  const handleLanguageChange = (code) => {
    i18next.changeLanguage(code); // Change the language using i18next library
    // Add any additional logic you need for language change
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
  }, [currentLanguage, t]);

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
  const [isOpen, setIsOpen] = useState(false);

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
        <DropdownMenu>
          <DropdownButton onClick={toggleDropdown}>
            <GlobeIcon />
          </DropdownButton>
          <DropdownContent isOpen={isOpen}>
            {languages.map(({ code, name, country_code }) => (
              <DropdownMenuItem key={country_code}>
                <DropdownItemLink
                  href="#"
                  className={currentLanguageCode === code ? "disabled" : ""}
                  onClick={() => handleLanguageChange(code)}
                >
                  {name}
                </DropdownItemLink>
              </DropdownMenuItem>
            ))}
          </DropdownContent>
        </DropdownMenu>
      </Nav>

      <SignUpComponent>
        <Form>
          <Field>
            <h2> {t("first_name")} </h2>
            <Input
              type="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Field>
          <Field>
            <h2> {t("last_name")} </h2>
            <Input
              type="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Field>
          <Field>
            <h2> {t("email")} </h2>
            <Input
              type="email"
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
              type="phone"
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
              type="fabricator"
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
            <h2> {t("kitchen_and_bath")} and Bath </h2>
            <Input
              type="kitchen_and_bath"
              value={kitchen_and_bath}
              onChange={(e) => setKitchen_and_bath(e.target.value)}
            />
          </Field>
          <Field>
            <h2> {t("designer_or_architech")} </h2>
            <Input
              type="designer_or_architech"
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
        id={id}
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

const DropdownMenu = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const DropdownButton = styled.button`
  margin-top: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ConcentButton = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
  color: yellow;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 10px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  background-color: #fff;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const DropdownMenuItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownItemLink = styled.a`
  color: black;
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
