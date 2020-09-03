import {
    MAX_VALID_CONTENT_LENGTH,
    MIN_VALID_TITLE_LENGTH,
    MAX_VALID_TITLE_LENGTH,
    MIN_VALID_CONTENT_LENGTH,
} from "../consts/newPostConsts";

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