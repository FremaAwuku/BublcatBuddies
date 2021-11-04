import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import emailRegex from "email-regex"
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session?.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState([]);
  useEffect(()=>{
    const errorArr = []
    if(!emailRegex({exact:true}).test(email)){
      errorArr.push("Please Enter Valid Email")
    }
    if(username.length < 3){
      errorArr.push("Username must be longer than 3 characters")
    }
    if(firstName.length < 3){
      errorArr.push("First Name must be longer than 3 characters")
    }
    setErrors(errorArr)

  },[email,username,firstName])
  if (sessionUser) return <Redirect to={`/users/${sessionUser.id}`}/>;


  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, email, username, password}))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });

    }

    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="formTempCont">
      <h1 className="formTempHead"> SIGN UP!</h1>
      <form
    className="formTempForm"
    onSubmit={handleSubmit}>
      <ul className="errors" id="signUp">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className="formTempLabel">
        Email
        <input
        className="formTempInput"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="formTempLabel">
        First Name
        <input
        className="formTempInput"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label className="formTempLabel">
        Username
        <input
        className="formTempInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label className="formTempLabel">
        Password
        <input
        className="formTempInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className="formTempLabel">
        Confirm Password
        <input

        className="formTempInput"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      {/* <label className="formTempLabel">
        Profile Image URL
        <input
        className="formTempInput"
          type="text"
          value={profileImgUrl}
          onChange={(e) => setProfileImgUrl(e.target.value)}
          required
        />
      </label> */}
      <button
      className="formTempBtn"
      id="signUp"
      type="submit">Sign Up</button>
    </form>
    </div>

  );
}

export default SignupFormPage;
