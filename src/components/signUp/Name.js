import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Name = (props) => {
  /*
   * Define states and constants
   */
  const { t } = useTranslation();

  /*
   * Define hooks
   */
  useEffect(() => {
    document.body.dir = props.selectedLanguage.dir || "ltr";
  }, [props.selectedLanguage]);

  /*
   * Define functions
   */

  return (
    <Container>
      <Field>
        <h2> {t("first_name")} </h2>
        <Input
          type="text"
          value={props.firstName}
          onChange={(e) => props.setFirstName(e.target.value)}
          required
        />
      </Field>
      <Field>
        <h2> {t("last_name")} </h2>
        <Input
          type="text"
          value={props.lastName}
          onChange={(e) => props.setLastName(e.target.value)}
          required
        />
      </Field>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
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

export default Name;
