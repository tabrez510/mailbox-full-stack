import React, { useEffect, useRef } from "react";
import {
  Container,
  Form,
  Button,
  FloatingLabel,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../features/auth/authActions";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cnfPasswordRef = useRef();

  const signupStatus = useSelector((state) => state.auth.signupStatus);
  const signupError = useSelector((state) => state.auth.signupError);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredCnfPassword = cnfPasswordRef.current.value;

    await dispatch(
      signupUser({
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword: enteredCnfPassword,
      })
    );
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    cnfPasswordRef.current.value = "";
    navigate("/received-mail");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
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
        <h2 className="text-center mb-4">Sign Up</h2>
        {signupError && <Alert variant="danger">{signupError}</Alert>}
        <Form onSubmit={formSubmitHandler} data-testid="signup-form">
          <Form.Group controlId="formName" className="mb-3">
            <FloatingLabel label="Enter your name" className="mb-3">
              <Form.Control type="text" placeholder="Name" ref={nameRef} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <FloatingLabel label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="Email" ref={emailRef} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <FloatingLabel
              controlId="formConfirmPassword"
              label="Confirm Password"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={cnfPasswordRef}
              />
            </FloatingLabel>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={signupStatus === "Loading"}
          >
            {signupStatus === "Loading" ? (
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
              "Sign Up"
            )}
          </Button>
        </Form>
        <div className="text-center mt-3">
          <span>Have an account? </span>
          <Link to="/auth/login">Login</Link>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
