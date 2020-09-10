import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { BACKEND_URL } from "../constant";
import { currentUser } from "../recoilStates/currentUser";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup
} from "reactstrap";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const setUserId = useSetRecoilState(currentUser);
  const [currentError, setError] = useState(null);

  useEffect(() => {
    if (currentError) {
      console.log("Hi");
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
        setError(null);
      }, 3000);
    }
  }, [currentError]);

  const loginRequest = async () => {
    try {
      if (!(email && password)) {
        return setError("Please enter the login details");
      }
      const data = {
        email: email,
        password: password
      };
      const res = await fetch(`${BACKEND_URL}login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const response = await res.json();
      if (res.status === 200) {
        setUserId(response.user._id);
        localStorage.setItem("currentUser", JSON.stringify(response.user._id));
        history.push("/home");
      } else if (res.status === 400) {
        setError(response.error);
      }
    } catch (e) {
      console.log("Login failed" + e);
      setError("Server Error");
    }
  };

  const routeSignup = () => {
    history.push("/signUp");
  };

  const routeResetPassword = () => {
    history.push("/forgotPassword");
  };

  return (
    <div>
      <Form className="balsa">
        <h3 className="heading balsa">Login</h3>
        <FormGroup row>
          <Label for="exampleEmail" sm={3}></Label>
          <Label for="exampleEmail" sm={1}>
            Email
          </Label>
          <Col sm={4}>
            <Input
              type="email"
              name="email"
              id="userEmail"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              placeholder="Enter your email"
            />
          </Col>
        </FormGroup>
        <FormGroup row className="passbar">
          <Label for="exampleEmail" sm={3}></Label>
          <Label for="examplePassword" sm={1}>
            Password
          </Label>
          <Col sm={4}>
            <Input
              type="password"
              name="password"
              id="userPassword"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              placeholder="Enter your passsword"
            />
          </Col>
        </FormGroup>
        <ButtonGroup>
          <Button outline color="secondary" onClick={routeSignup}>
            Sign-up
          </Button>

          <Button color="secondary" onClick={loginRequest}>
            Login
          </Button>

          <Button outline color="secondary" onClick={routeResetPassword}>
            Forgot passsword
          </Button>
        </ButtonGroup>
        <div id="snackbar">{currentError}</div>
      </Form>
    </div>
  );
};

export default LoginCard;
