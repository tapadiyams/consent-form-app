import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getEmployeesListAPI, setEmployeeAPI } from "../actions";

const LogIn = ({
  getEmployeesList,
  emailError,
  employees,
  setEmployee,
  setEmployeeName,
  setEmployeePermission,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const [isLoading, setIsLoading] = useState(false); // Loading state

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

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    setIsLoading(true);

    // this has to be async operation
    await setEmployeeName(employee.employeeName);
    await setEmployeePermission(employee.employeePermission);

    await delay(1000);

    // TODO [tapadiyams@gmail.com]: Correct the setEmployee action.
    const employeeData = {
      employeeName: employee.employeeName,
      employeePermission: employee.employeePermission,
    };
    setEmployee(employeeData);

    setIsLoading(false); // Set loading state to false

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
        <Button onClick={verifyEmployeeCredentials}>
          {" "}
          {isLoading ? <Spinner /> : "LOG IN"}
        </Button>
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

const Spinner = styled.div`
  /* Add styles for the spinner */
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top-color: #50c878;
  border-radius: 50%;

  animation: spinnerAnimation 0.6s linear infinite;

  @keyframes spinnerAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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

  /* Flexbox properties for centering */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  /* Add padding to create space for the spinner */
  padding-right: 24px; /* Adjust the value as needed */

  /* Adjust the spinner position */
  & > ${Spinner} {
    /* position: absolute; */
    right: 20px; /* Adjust the value as needed */
  }
`;

const mapStateToProps = (state) => {
  return {
    employees: state.stoneState.employees,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getEmployeesList: () => dispatch(getEmployeesListAPI()),
  setEmployee: (payload) => dispatch(setEmployeeAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
