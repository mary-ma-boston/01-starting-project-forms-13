import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";


const BasicForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const isNotEmpty = value => value.trim() !== '';
  // const isEmail = value => value.includes('@');

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetlastNameInput
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => ValidateEmail(value));

  useEffect(()=>{
    if(enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  },[enteredFirstNameIsValid, enteredLastNameIsValid, enteredEmailIsValid])

  function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }}

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if(!enteredFirstNameIsValid || !enteredLastNameIsValid ||!enteredEmailIsValid ) {
      return;
    }

    resetFirstNameInput();
    resetlastNameInput();
    resetEmailInput();
  }

  const firstNameInputClasses = firstNameInputHasError? 'form-control invalid' :'form-control';
  const lastNameInputClasses = lastNameInputHasError? 'form-control invalid' :'form-control';
  const emailInputClasses = emailInputHasError? 'form-control invalid' :'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='firstname'>First Name</label>
          <input 
            type='text' 
            id='firstname' 
            value={enteredFirstName}
            onChange={firstNameChangeHandler} 
            onBlur={firstNameBlurHandler}
          />
          {firstNameInputHasError && <p className="error-text">FirstName must not be empty.</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='lastname'>Last Name</label>
          <input 
            type='text' 
            id='lastname'
            value={enteredLastName}
            onChange={lastNameChangeHandler} 
            onBlur={lastNameBlurHandler}
          />
           {lastNameInputHasError && <p className="error-text">LastName must not be empty.</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
          type='text' 
          id='email'
          value={enteredEmail}
          onChange={emailChangeHandler} 
          onBlur={emailBlurHandler}
        />
         {emailInputHasError && <p className="error-text">Email is not correct.</p>}

      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
