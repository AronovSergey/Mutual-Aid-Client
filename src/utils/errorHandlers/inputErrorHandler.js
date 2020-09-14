import {
    MAX_VALID_CONTENT_LENGTH,
    MIN_VALID_TITLE_LENGTH,
    MAX_VALID_TITLE_LENGTH,
    MIN_VALID_CONTENT_LENGTH,
} from './../consts/newPostConsts';

import { VALID_PASSWORD_LENGTH } from './../consts/signUpConsts';

export const isTextLengthValid = (minLength, maxLength, txt) =>
  txt.length > minLength && txt.length <= maxLength;

export const isTagsLengthValid = (tags) => tags.length > 0;

export const isPostTitleValid = (postTitle) =>
  isTextLengthValid(MIN_VALID_TITLE_LENGTH, MAX_VALID_TITLE_LENGTH, postTitle);

export const isPostContentValid = (postContent) =>
  isTextLengthValid(MIN_VALID_CONTENT_LENGTH, MAX_VALID_CONTENT_LENGTH, postContent);

export const displayPostTitleError = (postTitle) =>
  postTitle && !isPostTitleValid(postTitle);  

export const displayPostContentError = (postContent) =>
  postContent && !isPostContentValid(postContent);  

export const helpTextMessage = (minLength, maxLength, txt, typeOfTxt) => {
    const leftChars = `${maxLength - txt.length} characters left.`;
    if (txt.length === 0) return "";
    else if (txt.length > maxLength)
      return `${typeOfTxt} is too long. Make it less than ${maxLength} characters.`;
    else if (txt.length < minLength)
      return `The ${typeOfTxt.toLowerCase()} cannot be less than ${minLength} characters. ${leftChars}`;
    else return leftChars;
};

export const postTitleTextHelper = (postTitle) =>
  helpTextMessage(MIN_VALID_TITLE_LENGTH, MAX_VALID_TITLE_LENGTH, postTitle, "Title");

export const PostContentTextHelper = (postContent) =>
  helpTextMessage(MIN_VALID_CONTENT_LENGTH, MAX_VALID_CONTENT_LENGTH, postContent, "Content");  

export const isPasswordValid = (pwd, validPwdLength) =>
  pwd.length >= validPwdLength && /\d/.test(pwd) && /[a-z]/.test(pwd);

export const isSignUpPasswordValid = (password) =>
  isPasswordValid(password, VALID_PASSWORD_LENGTH);  

export const helpTextPasswordMessage = (pwd, validPwdLength) => {
  if (!pwd)
    return `A valid password consists of ${validPwdLength} letters, atleast one number and atleast one lowercased character.`;
  if (pwd.length < validPwdLength) return `The password is too short.`;
  else {
    return isPasswordValid(pwd, validPwdLength)
      ? ""
      : `The password is invalid!`;
  }
};

export const signUpPasswordTextHelper = (password) =>
  helpTextPasswordMessage(password, VALID_PASSWORD_LENGTH);

export const errorSignUpPassword = (password) =>
  password && !isPasswordValid(password, VALID_PASSWORD_LENGTH);

export const isEmailValid = (email) =>
  /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/.test(email);

export const errorSignUpEmail = (email) => email && !isEmailValid(email);

export const isFieldValueValid = (fieldValue) => fieldValue.indexOf(" ") < 0;

export const errorSignUpInputField = (field) =>
  field && !isFieldValueValid(field);

export const helpTextEmailMessageForSignUp = (email) => {
  if (!email) return `A valid email is of the form 'example@email.com'.`;
  return email && isEmailValid(email) ? "" : "invalid email!";
};

export const helpTextField = (fieldValue) =>
  isFieldValueValid(fieldValue)
    ? "" : "The value cannot be empty nor contain white spaces!";

export const errorSignInEmail = (email) => email && !isEmailValid(email);    

export const helpTextEmailMessageForSignIn = (email) =>
  email ? (isEmailValid(email) ? `` : `invalid email!`) : ``;

export const isPasswordEmpty = (password) => password.length < 1;  