import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const GlobeIcon = ({ width = 35, height = 35, fill = "#fff" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    className="bi bi-globe"
    viewBox="0 0 16 16"
  >
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
  </svg>
);

const Home = (props) => {
  /**
   *
   * Define Constants and States
   *
   */
  // Language dropdown state
  const [isOpen, setIsOpen] = useState(false);
  // Language change constants
  const { t, i18n } = useTranslation();
  const history = useHistory();

  /**
   *
   * Define methods and functions
   *
   */
  const handleLanguageChange = (code) => {
    i18next.changeLanguage(code); // Change the language using i18next library
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNewCustomerClick = () => {
    history.push("/signup");
    props.setSelectedLanguage(i18n.language);
  };

  const handleExistingCustomerClick = () => {
    history.push("/lookup");
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  /**
   *
   * Define view
   *
   */
  return (
    <Container>
      <BackgroundImage src="/images/granite-countertop-1080x600.jpg" alt="" />
      <ContentWrapper>
        <Nav>
          <LoginButton onClick={handleLoginClick}>Log In</LoginButton>
          <DropdownMenu>
            <DropdownButton onClick={toggleDropdown}>
              <GlobeIconWrapper>
                <GlobeIcon />
              </GlobeIconWrapper>
            </DropdownButton>
            <DropdownContent isOpen={isOpen}>
              {props.languages.map(({ code, name, country_code }) => (
                <DropdownMenuItem key={country_code}>
                  <DropdownItemLink
                    href="#"
                    className={
                      props.currentLanguageCode === code ? "disabled" : ""
                    }
                    onClick={() => handleLanguageChange(code)}
                  >
                    {name}
                  </DropdownItemLink>
                </DropdownMenuItem>
              ))}
            </DropdownContent>
          </DropdownMenu>
        </Nav>
        <RelianceImage>
          <img src="/images/reliancewhite.png" alt="" />
        </RelianceImage>

        <Section>
          <h1>{t("welcome_to_reliance_stone")}</h1>

          <ButtonContainer>
            <Button onClick={handleExistingCustomerClick}>
              {t("existing_customer")}
            </Button>
            <Button onClick={handleNewCustomerClick}>
              {t("new_customer")}
            </Button>
          </ButtonContainer>
        </Section>
      </ContentWrapper>
      <h2> Copyright © 2023 - Reliance Stones</h2>
    </Container>
  );
};

/**
 *
 * Define styled components
 *
 */
const Container = styled.div`
  position: relative; /* Make the container a positioning context */

  h2 {
    font-size: x-small;
    text-align: center;
    font-weight: 100;
    padding: 20px;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
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

const Nav = styled.nav`
  margin: auto;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  padding-top: 10px;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 40px;
  cursor: pointer;
  margin-right: 120px;

  /* Some animation */
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: grey;
    color: #cca132;
    border-color: #cca132;
  }
`;

const GlobeIconWrapper = styled.div`
  margin-right: 60px;
  padding-top: 10px;
  svg {
    transition: width 0.3s ease, height 0.3s ease, fill 0.3s ease;
  }

  &:hover svg {
    width: 35px;
    height: 35px;
    fill: #cca132;
  }
`;

const DropdownMenu = styled.ul`
  align-items: center;
  display: flex;
  position: absolute;
  top: 0;
  list-style-type: none;
  padding: 0;
  margin: 0;
  gap: 5px;
  z-index: 1;
`;

const DropdownButton = styled.button`
  margin-top: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  background-color: #fff;

  border-radius: 4px;
  box-shadow: 0 20px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownMenuItem = styled.li`
  cursor: pointer;
  padding: 10px 20px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownItemLink = styled.a`
  color: black;
  text-decoration: none;
`;

const RelianceImage = styled.div`
  display: flex;
  justify-content: center; /* Align children horizontally */
  align-items: center; /* Align children vertically */
  margin-top: 40px;

  & > img {
    width: 350px;
    height: 200px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 700px;
  max-width: 1128px;
  padding: 60px 0;
  position: relative;

  margin: auto;

  h1 {
    font-size: 65px;
    color: #cca132;
    font-weight: 200;
    line-height: 70px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  gap: 20px;
  padding-top: 150px;
`;

const Button = styled.button`
  font-size: 30px;
  background-color: #cca132;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 30px 70px 30px 70px;

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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
