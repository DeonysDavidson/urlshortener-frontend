import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BACKEND_URL } from "../constant";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentError, setError] = useState(null);
  const history = useHistory();

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

  const backer = () => {
    history.push("/");
  };

  function ValidateEmail() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true;
    } else {
      setError("You have entered an invalid email address!");
      return false;
    }
  }

  const signer = async () => {
    try {
      if (fname && Lname && email && password) {
        if (!ValidateEmail()) {
          return;
        }
        const data = {
          firstName: fname,
          lastName: Lname,
          email: email,
          password: password
        };
        const res = await fetch(`${BACKEND_URL}signup`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (res.status === 200) {
          // const response = await res.json();
          history.push("/confirm");
          // setError(response.message);
        } else if (res.status === 400) {
          const response = await res.json();
          setError(response.error);
        } else {
          setError("Server Error");
        }
      } else {
        setError("Please enter valid details");
      }
    } catch (err) {
      console.log(err);
      setError("Server Error");
      // setError(null);
    }
  };

  return (
    <>
      <h3 className="heading balsa">Sign-Up</h3>
      <Form className="balsa">
        <FormGroup row>
          <Label for="exampleEmail" sm={3}></Label>
          <Label for="firstName" sm={1}>
            First Name :
          </Label>
          <Col sm={4}>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={fname}
              onChange={(event) => setFname(event.target.value)}
              placeholder="Enter first name"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={3}></Label>
          <Label for="lastName" sm={1}>
            Last Name :
          </Label>
          <Col sm={4}>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={Lname}
              onChange={(event) => setLname(event.target.value)}
              placeholder="Enter last name"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={3}></Label>
          <Label for="userEmail" sm={1}>
            Email :
          </Label>
          <Col sm={4}>
            <Input
              type="email"
              name="userEmail"
              id="userEmail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter email"
            />
          </Col>
        </FormGroup>
        <FormGroup row className="passbar">
          <Label for="exampleEmail" sm={3}></Label>
          <Label for="userPassword" sm={1}>
            Password :
          </Label>
          <Col sm={4}>
            <Input
              type="password"
              name="userPassword"
              id="userPassword"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
          </Col>
        </FormGroup>
      </Form>
      <Button color="secondary" onClick={signer}>
        Sign-up
      </Button>
      <Button color="info" onClick={backer}>
        Back
      </Button>
      <div id="snackbar">{currentError}</div>
    </>
  );
};

export default Signup;
