import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createUser } from '../redux/actions/authActions';
import TextField from '@material-ui/core/TextField';
import SignForm from '../components/users/SignForm';
import { initSignUpValues } from '../utils/consts/signUpConsts';
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
} from '../utils/errorHandlers/inputErrorHandler';

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [signUpDetails, setSignUpDetails] = useState(initSignUpValues);
  const { userName, email, password } = signUpDetails;

  const handleInputChange = useCallback((event) => {
      const { name, value } = event.target;
      setSignUpDetails((prevSignUpDetails) => {
        return {
          ...prevSignUpDetails,
          [name]: value,
        };
      });
    } , [setSignUpDetails]);

  const isInputValid = useCallback(
    (userName, password, email) =>
      isFieldValueValid(userName) &&
      isSignUpPasswordValid(password) &&
      isEmailValid(email)
      , []);

  const enableSignUpButton = useCallback(
    (userName, password, email, isLoading) => {
      return !isInputValid(userName, password, email) || isLoading;
    }
    , [isInputValid]);

  const handleSignUpButton = useCallback(
    (userName, password, email) => {
      if (isInputValid(userName, password, email)) {
        dispatch(createUser(userName, email, password, history));
      }
    },[dispatch, history, isInputValid]);

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
        userName,
        password,
        email,
        // isLoading
      )}
      handleButtonClick={() =>
        handleSignUpButton(userName, password, email)
      }
    >
      {inputFields()}
      {passwordField()}
      {emailField()}
    </SignForm>
  );
};

export default SignUp;