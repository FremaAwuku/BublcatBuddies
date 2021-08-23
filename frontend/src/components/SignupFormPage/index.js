import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

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
  const [profileImgUrl, setProfileImgUrl] = useState("")
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, email, username, password, profileImgUrl }))
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
      <label className="formTempLabel">
        Profile Image URL
        <input
        className="formTempInput"
          type="text"
          value={profileImgUrl}
          onChange={(e) => setProfileImgUrl(e.target.value)}
          required
        />
      </label>
      <button
      className="formTempBtn"
      id="signUp"
      type="submit">Sign Up</button>
    </form>
    </div>

  );
}

export default SignupFormPage;
