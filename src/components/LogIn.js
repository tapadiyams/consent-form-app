import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const Container = styled.section``;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  object-fit: cover;
`;

const Wrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100%;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

function LogIn() {
  const [dados, setDados] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dados);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDados((prevDados) => ({
      ...prevDados,
      [name]: value,
    }));
  };

  return (
    <Container>
      <BackgroundImage src="/images/granite-countertop-1080x600.jpg" alt="" />
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="email"
            value={dados.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            value={dados.password}
            onChange={handleChange}
          />
          <Button>Log In</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default LogIn;
