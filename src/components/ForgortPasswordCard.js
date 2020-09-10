import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BACKEND_URL } from "../constant";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

const ForgotCard = () => {
  const history = useHistory();
  const [currentError, setError] = useState(null);
  const [regEmail, setRegEmail] = useState(null);

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

  const passChangeReq = async () => {
    try {
      if (regEmail) {
        const data = {
          email: regEmail
        };
        const res = await fetch(`${BACKEND_URL}forgotPassword`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (res.status === 200) {
          // const response = await res.json();
          // setError(response.message);
          history.push("/confirm");
        } else if (res.status === 400) {
          const response = await res.json();
          setError(response.error);
        } else {
          setError("Server Error");
        }
      } else {
        setError("Please enter valid Email");
      }
    } catch (err) {
      console.log(err);
      setError("Server Error");
      // setError(null);
    }
    // setError("An Email has been sent to the registered email");
  };

  return (
    <>
      <Form>
        <h3 className="heading balsa">Reset Password</h3>
        <FormGroup row className="passbar balsa">
          <Label for="exampleEmail" sm={2}></Label>
          <Label for="userEmail" sm={2}>
            Enter Your Email :
          </Label>
          <Col sm={4}>
            <Input
              type="email"
              name="userEmail"
              id="userEmail"
              value={regEmail}
              onChange={(event) => setRegEmail(event.target.value)}
              placeholder="Enter the registered Email"
            />
          </Col>
        </FormGroup>
      </Form>
      <Button color="secondary" onClick={passChangeReq}>
        Reset
      </Button>
      <Button color="info" onClick={backer}>
        Back
      </Button>
      <div id="snackbar">{currentError}</div>
    </>
  );
};

export default ForgotCard;
