import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { BACKEND_URL } from "../constant";

const NewPasswordCard = () => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, newConfirmPass] = useState("");
  const [currentError, setError] = useState(null);
  const history = useHistory();
  let { token } = useParams();

  useEffect(() => {
    if (currentError) {
      console.log("Hi");
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
        setError(null);
        if (currentError === "Password reset success") {
          history.push("/");
        }
      }, 3000);
    }
  }, [currentError]);

  const backer = () => {
    history.push("/");
  };

  const passChangeReq = async () => {
    try {
      if (!(newPass && confirmPass)) {
        return setError("Please enter the passwords");
      }
      if (newPass === confirmPass) {
        const data = {
          token,
          newPassword: confirmPass
        };
        const res = await fetch(`${BACKEND_URL}forgotPassword/reset`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (res.status === 200) {
          const response = await res.json();

          setError(response.message);
        } else if (res.status === 400) {
          const response = await res.json();
          setError(response.error);
        } else {
          setError("Server Error");
        }
      } else {
        setError("Passwords did not match");
      }
    } catch (err) {
      console.log(err);
      setError("Server Error");
      // setError(null);
    }
  };

  return (
    <>
      <Form className="balsa">
        <FormGroup row>
          <Label for="exampleEmail" sm={3}></Label>
          <Label for="newPass " sm={2}>
            New Password
          </Label>
          <Col sm={4}>
            <Input
              type="text"
              name="newPass"
              id="newPass"
              value={newPass}
              onChange={(event) => setNewPass(event.target.value)}
              placeholder="Enter New Password"
            />
          </Col>
        </FormGroup>
        <FormGroup row className="passbar">
          <Label for="exampleEmail" sm={3}></Label>
          <Label for="confirmPass" sm={2}>
            Re-Enter New Password :
          </Label>
          <Col sm={4}>
            <Input
              type="password"
              name="confirmPass"
              id="confirmPass"
              value={confirmPass}
              onChange={(event) => newConfirmPass(event.target.value)}
              placeholder="Re - Enter New Password"
            />
          </Col>
        </FormGroup>
        <Button color="secondary" onClick={passChangeReq}>
          Reset
        </Button>
        <Button color="info" onClick={backer}>
          Back
        </Button>
      </Form>
      <div id="snackbar">{currentError}</div>
    </>
  );
};

export default NewPasswordCard;

// if (newPass === confirmPass) {
// } else {
//   setError("The Passwords did not match");
// }
// console.log(token);
