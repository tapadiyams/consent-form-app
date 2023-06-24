import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Fabricator = (props) => {
  // Defining functions

  const handleCheckboxChange = () => {
    props.setIsNotApplicableFabricator(!props.isNotApplicableFabricator);
  };

  const { t } = useTranslation();

  return (
    <>
      <Field>
        <h2>{t("fabricator")}</h2>
        {!props.isNotApplicableFabricator && (
          <Input
            type="text"
            value={props.fabricator}
            onChange={(e) => props.setFabricator(e.target.value)}
          />
        )}
        <CheckboxContainer>
          <input
            type="checkbox"
            id="notApplicableCheckbox"
            checked={props.isNotApplicableFabricator}
            onChange={handleCheckboxChange}
          />
          <CheckboxLabel htmlFor="notApplicableCheckbox">
            {t("not_applicable")}
          </CheckboxLabel>
        </CheckboxContainer>
        {!props.isNotApplicableFabricator && (
          <Input
            type="text"
            value={props.f_address}
            placeholder="Enter Fabricator's Address"
            onChange={(e) => props.setF_address(e.target.value)}
            required
          />
        )}
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  margin-left: 10px;
`;

export default Fabricator;
