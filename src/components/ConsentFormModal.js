import styled from "styled-components";
import { connect } from "react-redux";
import "firebase/compat/firestore";
import consentText from "./consentText";

const ConsentFormModal = (props) => {
  const reset = (e) => {
    props.handleClick(e);
  };

  const formattedConsentText = consentText.replace(/\n/g, "<br>");

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Waiver and Release indemnity agreement</h2>
              {/* <p>{consentText}</p> */}
              <p dangerouslySetInnerHTML={{ __html: formattedConsentText }}></p>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" />
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

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsentFormModal);
