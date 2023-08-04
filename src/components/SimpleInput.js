import { useEffect, useState } from "react";

import useInput from "../hooks/useInput";


const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => ValidateEmail(value));

  // const [enteredName, setEnteredName] = useState('');
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // const [enteredEmail,setEnteredEmail] = useState('');
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  // const enteredNameIsValid = enteredName.trim() !== '';
  // const enteredNameIsInvalid = !enteredNameIsValid && enteredNameTouched;
  // const enteredEmailIsValid = enteredEmail.trim() !== '';
  // const enteredEmailIsValid = ValidateEmail(enteredEmail.trim());
  // const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }}

  useEffect(()=>{
    if(enteredNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  },[enteredNameIsValid, enteredEmailIsValid]);

  // const nameInputChangeHandler = (e) => {
  //   setEnteredName(e.target.value);
  // };

  // const nameInputBlurHandler = (e) => {
  //   setEnteredNameTouched(true);
  // };

  // const emailInputChangeHandler = (e) => {
  //   setEnteredEmail(e.target.value);
  // };

  // const emailInputBlurHandler = () => {
  //   setEnteredEmailTouched(true);
  // }



  const formSubmissionHandler = (e) => {
    e.preventDefault();
    // setEnteredNameTouched(true);
    // setEnteredEmailTouched(true);

    if(!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    resetNameInput();
    resetEmailInput();
    // setEnteredName('');
    // setEnteredEmail('');
    // setEnteredNameTouched(false);
    // setEnteredEmailTouched(false);
  }

  const nameInputClasses = nameInputHasError? 'form-control invalid' :'form-control';
  const emailInputClasses = emailInputHasError? 'form-control invalid' :'form-control';


  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameChangeHandler} 
          value={enteredName}
          onBlur = {nameBlurHandler}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input 
          type='text' 
          id='email' 
          onChange={emailChangeHandler} 
          value={enteredEmail}
          onBlur = {emailBlurHandler}
        />
        {emailInputHasError && <p className="error-text">Email must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} >Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
