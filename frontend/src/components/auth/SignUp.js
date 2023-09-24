import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './SignUp.css';
import { Link } from "react-router-dom";

export default function SignUp({ setToken }) {

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);

    // Function to generate a random OTP
  const generateOTP = () => {
      // Implement OTP generation logic here (e.g., a random 6-digit number)
      const generatedOTP = Math.floor(100000 + Math.random() * 900000);
      // Send the OTP to the user's email (simulate this in your development environment)
      // You can use a library like Nodemailer for this in a real application
      console.log('OTP sent to email:', generatedOTP);
      setOtpSent(true);
  };

  function signupUser(userDetails) {
    return fetch(process.env.REACT_APP_END_POINT + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        alert(error);
      });
  }
  const handleSubmit = async e => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@pwa\.com$/;
    if (!email.match(emailRegex)) {
      setErrorMessage('Invalid email format. Please use a pwa.com email.');
      return;
    }

    if (otpSent) {
      // Validate OTP
      if (otp === '123456') { // Replace '123456' with the actual OTP validation logic
        // OTP is valid, allow user to sign up
        setIsOtpValid(true);
        // Implement user registration logic here
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } else {
      // Send OTP to the user's email
      generateOTP();
    }

    const data = {
      name,
      lastname,
      email,
      password,
      confirmpassword
    }
    const sessionUserDetails = await signupUser(data);
    if (sessionUserDetails && sessionUserDetails.token) {
      setToken({ token: sessionUserDetails.token, name: sessionUserDetails.user.name });
      window.location.reload();
    }
  }

  useEffect(() => {
    // Implement OTP expiration handling logic here (e.g., timeout)
    // Clear OTP after a certain period to prevent reuse
    const otpTimeout = setTimeout(() => {
      setOtpSent(false);
      setOtp('');
    }, 600000); // OTP expires after 10 minutes (adjust as needed)
    
    return () => clearTimeout(otpTimeout);
  }, [otpSent]);

  function validateForm() {
    const emailRegex = /^[A-Za-z0-9._%+-]+@deloitte\.com$/;
    
    return email.length > 0 && password.length > 0 &&
      name.length > 0 && lastname.length > 0 &&
      password === confirmpassword && email.match(emailRegex)
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
      {!isOtpValid ? (
        <Form onSubmit={handleSubmit}>
          <h3 className="heading-text">Sign Up</h3>
 
          <Form.Group size="lg" controlId="name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              data-test="first-name-form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              autoFocus
              data-test="last-name-form-control"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              data-test="email-form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              data-test="password-form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" controlId="confirmpassword">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              autoFocus
              data-test="conf-password-form-control"
              type="password"
              value={confirmpassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </Form.Group>
          {!otpSent ? (
            <button type="submit">Send OTP</button>
          ) : (
            <div>
              <label htmlFor="otp">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit">Verify OTP</button>
            </div>
          )}
          <Button size="lg" type="submit" disabled={!validateForm()} className="signup-button" data-test="signup-button">
            Sign Up
          </Button>
          <p>{errorMessage}</p>
        </Form>
      ) :(
        <p>Sign up successful!</p>)}
        <Link to='/login' className="login-link">Login</Link>
      </div>
    </div>
  );
  // Login.propTypes = {
  //     setToken: PropTypes.func.isRequired
  //   };

}
