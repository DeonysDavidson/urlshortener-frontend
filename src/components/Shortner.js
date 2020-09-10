import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { BACKEND_URL } from "../constant";
import { currentUser } from "../recoilStates/currentUser";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

const Shortner = () => {
  const [urlLong, setUrlLong] = useState("");
  const [urlShort, setShortUrl] = useState("");
  const [alias, setAlias] = useState("");
  const loggedUser = useRecoilValue(currentUser);
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

  const converter = async () => {
    try {
      if (!urlLong) {
        return setError("Enter the URL to be shortned");
      } else if (!alias) {
        return setError("Enter the Alias name for the URL");
      }
      const response = await fetch(
        `${BACKEND_URL}home/createUrl/${loggedUser}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ longUrl: urlLong, alias })
        }
      );

      if (response.status === 200) {
        const short = await response.json();
        setShortUrl(short.shortUrl);
      } else if (response.status === 401) {
        setError("Invalid URL");
      } else {
        setError("Server Error! try later.");
      }
    } catch (err) {
      console.log(err);
      setError("Server Error! try later.");
    }
  };

  return (
    <>
      <h1 className="shortner balsa">Shortner</h1>
      <Form className="balsa">
        <FormGroup row>
          <Label for="exampleEmail" sm={2}></Label>
          <Label for="alias" sm={1}>
            <h5>Alias :</h5>
          </Label>
          <Col sm={4}>
            <Input
              type="text"
              name="alias"
              id="alias"
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
              placeholder="Enter the Alias name here.."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}></Label>
          <Label for="longUrl" sm={1}>
            <h5>Long URL :</h5>
          </Label>
          <Col sm={6}>
            <Input
              type="text"
              name="longUrl"
              id="longUrl"
              value={urlLong}
              onChange={(event) => setUrlLong(event.target.value)}
              placeholder="Enter the Long Url here.."
            />
          </Col>
        </FormGroup>
      </Form>
      <Button color="secondary" sm={2} onClick={converter}>
        Convert
      </Button>

      {urlShort ? (
        <div id="short" class="card">
          <div class="card-body">
            <h5>
              Short URL : <a href={urlShort}>{urlShort}</a>
            </h5>
          </div>
        </div>
      ) : (
        ""
      )}

      <div id="snackbar">{currentError}</div>
    </>
  );
};

export default Shortner;
