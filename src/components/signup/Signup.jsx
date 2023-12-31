import React, { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { Link, Navigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Signup = () => {
  const { createUser, signInWithGoogle, signInWithGithub, cleanUp_UI, state } = useUserContext();
  console.log(state);
  useEffect(() => void cleanUp_UI(), []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const displayName = form.displayName.value;
    const email = form.email.value;
    const password = form.password.value;
    const retype_password = form.confirm_password.value;
    if (password !== retype_password) {
      alert("Password does not match ...");
    } else {
      console.log(displayName, email, password);
      createUser(email, password ,displayName)
        .then((result) => {
          const user = result.user;
          // try to solve this
          updateProfile(user,{
            displayName: displayName
          })
          console.log("SuccessFully registered user ...", user);
          Navigate('/login');
        })
        .catch((error) => {
          console.error(error);
        });
        
    }
    
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        Navigate('/');
      })
      .catch(error => {
        console.log('error', error.message);
      })
  };
  const handleGithubSignIn = () => {
    signInWithGithub()
      .then(result => {
        const user = result.user;
        console.log(user);
        Navigate('/');
      })
      .catch(error => {
        console.log('error', error.message);
      })
  }
  return (
    <div>
      <main className="main-holder">
        <h1 className="signup-header">Signup</h1>

        <div className="signup-error-msg-holder">
          <p className="signup-error-msg">
            Invalid Email{" "}
            <span id="error-msg-second-line">and/or password</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="displayName"
            className="signup-form-field"
            placeholder="Your Name"
          />
          <input
            type="email"
            name="email"
            className="signup-form-field"
            placeholder="Your email"
          />
          <input
            type="password"
            name="password"
            className="signup-form-field"
            placeholder="Password"
          />
          <input
            type="password"
            name="confirm_password"
            className="signup-form-field"
            placeholder="Confirm Password"
          />
          <input type="submit" value="signup" className="signup-form-submit" />
        </form>
        <label className="">
          <Link to="/login" className="">
            Already have an account?
          </Link>
        </label>
        <p>
          <small>Register with:</small>
        </p>
        <button onClick={handleGoogleSignIn} className="button ">
          Google
        </button>
        <br />
        <button onClick={handleGithubSignIn} className="button ">
          Github
        </button>
      </main>
    </div>
  );
};
export default Signup;
