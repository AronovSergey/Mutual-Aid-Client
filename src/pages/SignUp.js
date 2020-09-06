import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/actions/authActions";
import TextField from "@material-ui/core/TextField";
import SignForm from "../components/SignForm";
import { initSignUpValues } from "../utils/consts/signUpConsts";
import {
  errorSignUpPassword,
  isSignUpPasswordValid,
  signUpPasswordTextHelper,
  isEmailValid,
  helpTextEmailMessageForSignUp,
  isFieldValueValid,
  helpTextField,
  errorSignUpEmail,
  errorSignUpInputField,
} from "../utils/errorHandlers/inputErrorHandler";

const SignUp = () => {
  const [signUpDetails, setSignUpDetails] = useState(initSignUpValues);
  const { firstName, lastName, email, password } = signUpDetails;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setSignUpDetails((prevSignUpDetails) => {
        return {
          ...prevSignUpDetails,
          [name]: value,
        };
      });
    },
    [setSignUpDetails, signUpDetails]
  );

  const isInputValid = useCallback(
    (firstName, lastName, password, email) =>
      isFieldValueValid(firstName) &&
      isFieldValueValid(lastName) &&
      isSignUpPasswordValid(password) &&
      isEmailValid(email),
    [firstName, lastName, password, email]
  );

  const enableSignUpButton = useCallback(
    (firstName, lastName, password, email, isLoading) => {
      return !isInputValid(firstName, lastName, password, email) || isLoading;
    },
    [firstName, lastName, password, email, isLoading]
  );

  const handleSignUpButton = useCallback(
    (firstName, lastName, password, email) => {
      if (isInputValid(firstName, lastName, password, email)) {
        dispatch(createUser(firstName, lastName, email, password));
      }
    },
    [firstName, lastName, password, email]
  );

  const inputFields = () => {
    return Object.keys(signUpDetails)
      .filter((field) => field !== "email" && field !== "password")
      .map((field) => (
        <TextField
          error={errorSignUpInputField(signUpDetails[field])}
          helperText={helpTextField(signUpDetails[field])}
          margin="normal"
          required
          fullWidth
          label={field}
          name={field}
          value={signUpDetails.field}
          onChange={handleInputChange}
        />
      ));
  };

  const passwordField = () => (
    <TextField
      error={errorSignUpPassword(password)}
      helperText={signUpPasswordTextHelper(password)}
      type="password"
      margin="normal"
      required
      fullWidth
      label="password"
      name="password"
      value={password}
      onChange={handleInputChange}
    />
  );

  const emailField = () => (
    <TextField
      error={errorSignUpEmail(email)}
      helperText={helpTextEmailMessageForSignUp(email)}
      margin="normal"
      required
      fullWidth
      label="email"
      name="email"
      value={email}
      onChange={handleInputChange}
    />
  );

  return (
    <SignForm
      title="Sign Up"
      buttonDisable={enableSignUpButton(
        firstName,
        lastName,
        password,
        email,
        isLoading
      )}
      handleButtonClick={() =>
        handleSignUpButton(firstName, lastName, password, email)
      }
    >
      {inputFields()}
      {passwordField()}
      {emailField()}
    </SignForm>
  );
};

export default SignUp;