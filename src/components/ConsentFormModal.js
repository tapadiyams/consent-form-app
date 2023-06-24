import { connect } from "react-redux";
import "firebase/compat/firestore";
import consentText from "./consentText";
import styled from "styled-components";
import SignaturePad from "react-signature-canvas";
import { useRef } from "react";

const ConsentFormModal = (props) => {
  const sigCanvas = useRef({});

  const reset = (e) => {
    props.handleCrossClick(e);
  };

  // To break the statements
  const formattedConsentText = consentText.replace(/\n/g, "<br>");

  const handleCheckboxChange = (e) => {
    props.setAcceptTerms(e.target.checked);
  };

  const handleCloseClick = (e) => {
    if (!props.acceptTerms) {
      alert("You must accept the terms and conditions.");
      return;
    }
    if (!props.imageURL) {
      alert("You must sign and save to accept the waiver.");
      return;
    }
    reset(e);
  };

  const clear = () => sigCanvas.current.clear();

  const save = (e) => {
    const isCanvasEmpty = sigCanvas.current.isEmpty();
    if (isCanvasEmpty) {
      alert("Please sign in the box");
    } else {
      props.setImageURL(
        sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
      );

      // close the modal
      handleCloseClick(e);
    }
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Waiver and Release indemnity agreement</h2>
            </Header>
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
              <>
                {props.imageURL ? (
                  <img
                    src={props.imageURL}
                    alt="customer signature"
                    style={{
                      display: "block",
                      margin: "0 auto",
                      width: "150px",
                    }}
                  />
                ) : (
                  <SigningContainer>
                    <h2> Sign here </h2>
                    <StyledSignaturePad
                      ref={sigCanvas}
                      penColor="black"
                      backgroundColor="white"
                    />

                    <ButtonContainer>
                      <Button onClick={save}>Save</Button>
                      <Button onClick={clear}>Clear</Button>
                    </ButtonContainer>
                  </SigningContainer>
                )}
              </>
            </div>
            <ImgButton onClick={(e) => reset(e)}>
              <img src="/images/close-icon.svg" alt="" />
            </ImgButton>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
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

  h2 {
    color: #cca132;
    font-size: 30px;
  }

  p {
    font-size: 16px;
    margin-bottom: 20px;
    color: black;
  }
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);

  line-height: 1.5;
  font-weight: 200;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 30px;
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

const SigningContainer = styled.div``;

const StyledSignaturePad = styled(SignaturePad)`
  border: 1px solid black;
  width: 80%;
  min-height: 300px;
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  gap: 30px;
`;

const Button = styled.button`
  margin-bottom: 100px;
  padding: 10px 30px;
  border: 2px solid #50c878;
  font-size: 25px;
  cursor: pointer;

  &:hover {
    background-color: green;
  }
`;

const ImgButton = styled.button`
  border: none;
  background-color: transparent;

  svg,
  img {
    color: rgba(0, 0, 0, 0.6);
    height: 35px;
    width: 35px;
    cursor: pointer;
    background-color: #50c878;
    border-radius: 50%;
    padding: 10px;
    &:hover {
      background-color: green;
    }
  }
`;

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ConsentFormModal);
