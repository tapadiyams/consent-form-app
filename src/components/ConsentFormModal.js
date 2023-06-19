import { connect } from "react-redux";
import "firebase/compat/firestore";
import consentText from "./consentText";
import styled from "styled-components";

const ConsentFormModal = (props) => {
  const reset = (e) => {
    props.handleCrossClick(e);
  };

  // To break the statements
  const formattedConsentText = consentText.replace(/\n/g, "<br>");

  const handleCheckboxChange = (e) => {
    props.setAcceptTerms(e.target.checked);
  };

  const handleInitialsChange = (e) => {
    props.setInitials(e.target.value);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Waiver and Release indemnity agreement</h2>
              <p dangerouslySetInnerHTML={{ __html: formattedConsentText }}></p>
              <div>
                <CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    checked={props.acceptTerms}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxText>
                    I hereby accept the <strong>terms and conditions</strong>{" "}
                    written in this consent form
                  </CheckboxText>
                </CheckboxLabel>
                <br />
                <InputLabel>
                  Sign with INITIALS
                  <Input
                    type="text"
                    value={props.initials}
                    onChange={handleInitialsChange}
                  />
                </InputLabel>
              </div>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: white;
  max-height: 90%;
  overflow-y: auto; /* Enable vertical scrolling */
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
  padding: 20px; /* Add padding for better readability */

  h2 {
    color: #cca132;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 4px;
  }
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 25px;
  line-height: 1.5;
  font-weight: 200;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 16px;
    margin-bottom: 20px;
    color: black;
  }

  button {
    border: none;
    background-color: white;
    svg,
    img {
      color: rgba(0, 0, 0, 0.6);
      height: 35px;
      width: 35px;
      pointer-events: none;
    }
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

const CheckboxText = styled.span`
  color: black;
  font-size: 20px;
  font-weight: bold;
`;

const InputLabel = styled.label`
  color: black;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

const Input = styled.input`
  margin-top: 5px;
  font-size: 16px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
`;

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ConsentFormModal);
