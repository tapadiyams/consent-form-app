import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getEmployeesListAPI, setEmployee } from "../actions";

const LogIn = ({ getEmployeesList, emailError, employees }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const history = useHistory();

  // hooks
  useEffect(() => {
    const fetchEmployeesList = async () => {
      await getEmployeesList();
    };
    fetchEmployeesList();
  }, [getEmployeesList]); // Include props in the dependency array if needed for other parts of the component

  const verifyEmployeeCredentials = async () => {
    if (!email) {
      alert("Email cannot be empty.");
      return;
    }

    if (!password) {
      alert("Password cannot be empty.");
      return;
    }

    const employee =
      employees &&
      Object.values(employees).find(
        (e) =>
          e.employeeEmail &&
          e.employeeEmail.toLowerCase() === email.toLowerCase() &&
          e.employeePassword &&
          e.employeePassword.toLowerCase() === password.toLowerCase()
      );

    if (!employee) {
      alert(`Please check your email and password.`);
      return;
    }

    const employeeData = {
      employeeEmail: employee.employeeEmail,
      employeePassword: employee.employeePassword,
      employeeAuthority: "1",
    };
    setEmployee(employeeData);

    history.push("/view");
  };

  return (
    <Container>
      <BackgroundImage src="/images/granite-countertop-1080x600.jpg" alt="" />
      <RelianceImage>
        <img src="/images/reliancewhite.png" alt="" />
      </RelianceImage>
      <Field>
        <H2>EMAIL</H2>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={emailError}
        />
      </Field>

      <Field>
        <H2>PASSWORD</H2>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide Password" : "Show Password"}
        </PasswordToggle>
        <Button onClick={verifyEmployeeCredentials}>ENTER THE WEBSITE</Button>
      </Field>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 10px;
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

const RelianceImage = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  & > img {
    width: 350px;
    height: 200px;
  }
`;

const H2 = styled.h2`
  color: #cca132;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 30%;
  z-index: 1;
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

const PasswordToggle = styled.div`
  color: #50c878;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
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
    background: #cca132;
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

const mapStateToProps = (state) => {
  return {
    employees: state.stoneState.employees,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getEmployeesList: () => dispatch(getEmployeesListAPI()),
  // setEmployee: (payload) => dispatch(setEmployeeAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
