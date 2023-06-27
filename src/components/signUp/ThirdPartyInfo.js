import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const ThirdPartyInfo = (props) => {
  // Defining functions

  const handleCheckboxChange = () => {
    props.setIsNotApplicable(!props.isNotApplicable);
  };

  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = props.selectedLanguage.dir || "ltr";
  }, [props.selectedLanguage]);

  return (
    <>
      <Field>
        <h2>{props.title}</h2>
        {!props.isNotApplicable && (
          <FullLineInput
            type="text"
            value={props.name}
            placeholder={t("enter_name", {
              title_lowercase: props.title_lowercase.toLowerCase(),
            })}
            onChange={(e) => props.setName(e.target.value)}
          />
        )}
        <CheckboxContainer>
          <input
            type="checkbox"
            id="notApplicableCheckbox"
            checked={props.isNotApplicable}
            onChange={handleCheckboxChange}
          />
          <CheckboxLabel htmlFor="notApplicableCheckbox">
            {t("not_applicable")}
          </CheckboxLabel>
        </CheckboxContainer>
        {!props.isNotApplicable && (
          <>
            <FullLineInput
              type="text"
              value={props.address}
              placeholder={t("enter_address", {
                title_lowercase: props.title.toLowerCase(),
              })}
              onChange={(e) => props.setAddress(e.target.value)}
              required
            />
            <ContactInfo>
              <Input
                type="text"
                value={props.email}
                placeholder={t("enter_email", {
                  title_lowercase: props.title.toLowerCase(),
                })}
                onChange={(e) => props.setEmail(e.target.value)}
                required
              />
              <Input
                type="text"
                value={props.phone}
                placeholder={t("enter_phone", {
                  title_lowercase: props.title.toLowerCase(),
                })}
                onChange={(e) => props.setPhone(e.target.value)}
                required
              />
            </ContactInfo>
          </>
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

const FullLineInput = styled.input`
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

const ContactInfo = styled.div`
  display: flex;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  margin-left: 10px;
`;

export default ThirdPartyInfo;
