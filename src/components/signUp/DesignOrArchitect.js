import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const DesignOrArchitect = (props) => {
  // Defining constants

  const { t } = useTranslation();

  return (
    <>
      <Field>
        <h2> {t("designer_or_architech")} </h2>
        <Input
          type="text"
          value={props.designer_or_architech}
          onChange={(e) => props.setDesigner_or_architech(e.target.value)}
        />
      </Field>
    </>
  );
};

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
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
`;

export default DesignOrArchitect;
