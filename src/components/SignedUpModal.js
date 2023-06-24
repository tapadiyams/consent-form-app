import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import "firebase/compat/firestore";
import { useHistory } from "react-router-dom";

const SignedUpModal = (props) => {
  const history = useHistory();
  const reset = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>{props.text}</h2>
              <span>Your id is {props.customer_id}</span>

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
    text-align: center;
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

  span {
    color: black;
    text-align: center;
    padding: 40px;
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
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignedUpModal);
