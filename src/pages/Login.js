import React, { useState, useCallback } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions/authActions";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import SignForm from "../components/SignForm";
import {
  helpTextEmailMessageForSignIn,
  isEmailValid,
  isPasswordEmpty,
  errorSignInEmail,
} from "../utils/errorHandlers/inputErrorHandler";

const Login = () => {
  const initialInput = { email: "", password: "" };
  const history = useHistory();
  const [inputDetails, setInputDetails] = useState(initialInput);
  const { email, password } = inputDetails;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setInputDetails((prevSignUpDetails) => {
        return {
          ...prevSignUpDetails,
          [name]: value,
        };
      });
    },
    [setInputDetails]
  );

  const isInputValid = useCallback(
    () => isEmailValid(email) && !isPasswordEmpty(password),
    [email, password]
  );

  const isButtonDisabled = useCallback(() => !isInputValid() || isLoading, [
    isInputValid,
    isLoading,
  ]);

  const handleSignInButton = useCallback(() => {
    if (isInputValid) {
      dispatch(signIn(password, email));
      history.push({pathname: `/main`});
    }
  }, [dispatch, isInputValid, password, email]);

  return (
    <SignForm
      title="Sign In"
      buttonDisable={isButtonDisabled()}
      handleButtonClick={handleSignInButton}
    >
      <TextField
        error={Boolean(errorSignInEmail(email))}
        helperText={helpTextEmailMessageForSignIn(email)}
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={handleInputChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={handleInputChange}
      />
      <Grid container>
        <Grid item>
          <Link href="./signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </SignForm>
  );
};

export default Login;