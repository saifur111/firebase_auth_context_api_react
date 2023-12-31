import React, { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const {signIn,cleanUp_UI} = useUserContext();
    const navigate = useNavigate();
    useEffect(() => void cleanUp_UI(), []);
    const handleSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result =>{
          const user = result.user;
          console.log(user);
          form.reset();
          navigate('/');
        })
        .catch(error => {
          console.error(error);
        })
    }
  return (
    <div>
      <main className="main-holder">
        <h1 className="login-header">Login</h1>

        <div className="login-error-msg-holder">
          <p className="login-error-msg">
            Invalid username{" "}
            <span id="error-msg-second-line">and/or password</span>
          </p>
        </div>

        <form onSubmit={handleSubmit } className="login-form">
          <input
            type="email"
            name="email"
            className="login-form-field"
            placeholder="Your Email"
          />
          <input
            type="password"
            name="password"
            className="login-form-field"
            placeholder="Your Password"
          />
          <input type="submit" value="Login" className="login-form-submit" />
        </form>
        <p>Not Register yet?</p>
        <Link to="/signup">
        <button className="">Signup</button>
      </Link>
      </main>
    </div>
  );
};

export default Login;
