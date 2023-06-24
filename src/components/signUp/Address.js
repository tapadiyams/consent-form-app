import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const AddressFields = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Field>
        <h2> {t("address")} </h2>

        <AddressInput
          type="text"
          value={props.addressLine}
          placeholder={t("address_line")}
          onChange={(e) => props.setAddressLine(e.target.value)}
          required
        />
        <InputContainer>
          <Input
            type="text"
            value={props.aptNo}
            placeholder={t("apt_no")}
            onChange={(e) => props.setAptNo(e.target.value)}
            required
          />

          <Input
            type="text"
            value={props.city}
            placeholder={t("city")}
            onChange={(e) => props.setCity(e.target.value)}
            required
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            value={props.state}
            placeholder={t("state")}
            onChange={(e) => props.setState(e.target.value)}
            required
          />

          <Input
            type="text"
            value={props.zipCode}
            placeholder={t("zip_code")}
            onChange={(e) => props.setZipCode(e.target.value)}
            required
          />
        </InputContainer>
      </Field>
    </>
  );
};

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  /* h2 {
    font-size: 20px;
  } */
`;

const InputContainer = styled.div`
  display: flex;
`;

const AddressInput = styled.input`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;
  padding: 10px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
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

  width: 100%;
`;

export default AddressFields;
