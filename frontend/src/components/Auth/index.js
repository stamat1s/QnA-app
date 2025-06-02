import {
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, provider } from "../../firebase";
import "./index.css";
import googleLogo from '../../assets/google.png';
import githubLogo from '../../assets/github.png';
import facebookLogo from '../../assets/facebook.png';
import axios from "axios";



function Index() {
  const history = useHistory();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifypassword, setVerifyPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) {
      return false;
    } else return true;
  }

  const handleGoogleSignIN = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        setLoading(false);
        // console.log(res);
        history.push("/");
        // return (
        //   <>

        //   </>
        // );
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleSignIn = async () => {
    setError("");
    setLoading(true);
    if (username === "" || password === "") {
      setError("Required field is missing");
      setLoading(false);
    // } else if (!validateEmail(email)) {
    //   setError("Email is malformed");
    //   setLoading(false);
    } else {
       const bodyJSON = {
          username: username,
          password: password
      };
      await axios
        .post("/api/user/login", bodyJSON,  { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          // console.log(res.data);
          setLoading(false);
          // alert("User signed in successfully!");
          // here stored first token in localshtorage 
          localStorage.setItem("token", res.data.token)
          
          if(res.status==200){
            console.log("i am here");
            history.push("/");
          }
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRegister = async () => {
    setError("");
    setLoading(false);
    if (email === "" || password === "" || username === "" || verifypassword === "") {
      setError("Required field is missing.");
      setLoading(false);
    } else if (!validateEmail(email)) {
      setError("Email is malformed");
      setLoading(false);
    } else {
        const bodyJSON = {
          email: email,
          password: password,
          username: username,
          passwordVerify: verifypassword
      };
        await axios
        .post("/api/user", bodyJSON)
        .then((res) => {
          // console.log(res.data);
          alert("User registered successfully");
          history.push("/");
          
        })
        .catch((err) => {
          console.log(err);
        });
      
    }
  };
  return (
    <div className="auth">
      <div className="auth-container">
        <p>Welcome to StackOverflow! </p>
        <p>Try creating account or logging in using one of the following methods. </p>
        
        <div className="auth-login">
          <div className="auth-login-container">
            {register ? (
              <>
                {" "}
                <div className="input-field">
                  <p>Username</p>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </div>
                <div className="input-field">
                  <p>Verify Password</p>
                  <input
                    value={verifypassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    type="password"
                  />
                </div>
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </>
            ) : (
              <>
                <div className="input-field">
                  <p>Username</p>
                  <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text" />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password" />
                </div>
                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </>
            )}

            <p
              onClick={() => setRegister(!register)}
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "#0095ff",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {register ? "Have an account? Login" : "Don't have an account? Register."} 
            </p>
          </div>
        </div>
        <div className="sign-options">
          <div onClick={handleGoogleSignIN} className="single-option">
            <img
              alt="google"
              src={googleLogo}
            />
            <p>{loading ? "Signing in..." : "Login with Google"}</p>
          </div>
          <div className="single-option">
            <img
              alt="github"
              src={githubLogo}
            />
            <p>Login with Github</p>
          </div>
          <div className="single-option">
            <img
              alt="facebook"
              src={facebookLogo}
            />
            <p>Login with Facebook</p>
          </div>
        </div>
        {error !== "" && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Index;
