import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(()=>{
    let e = []
    if(credential.length <1){
      e.push()
    }
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };
  const loginDemo = () =>{

   return dispatch(sessionActions.login({credential:"demo@user.io",password:"password"}))

  }

  return (
    <form
    className="formTempForm"
    onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className="formTempLabel">
        Username or Email
        <input
        className="formTempInput"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
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
      <button
      className="formTempBtn"
      type="submit">
      <i class="fas fa-user"></i>
          Log In</button>
          <button
           onClick={loginDemo}
          style={{marginTop:10}}
          className="formTempBtn">
            Demo



          </button>
    </form>
  );
}

export default LoginForm;
