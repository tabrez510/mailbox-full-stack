import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authActions";

const Login = () => {
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const loginError = useSelector((state) => state.auth.loginError);
  const token = useSelector((state) => state.auth.token);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    await dispatch(loginUser({ email: enteredEmail, password: enteredPassword }));
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    navigate("/received-mail");
  };


  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 className="text-center mb-4">LogIn</h2>
        {loginError && <Alert variant="danger">{loginError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <FloatingLabel
              controlId="formEmail"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email"
                ref={emailInputRef}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <FloatingLabel controlId="formPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordInputRef}
              />
            </FloatingLabel>
          </Form.Group>
          <div className="mt-3 mb-3">
            <span>Forgot password ? </span>
            <Link to="/auth/forgotpassword">Click Here</Link>
          </div>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loginStatus === "Loading"}
          >
            {loginStatus === "Loading" ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Loading...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Form>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/auth/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
