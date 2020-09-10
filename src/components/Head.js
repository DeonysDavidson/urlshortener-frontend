import React from "react";
import { Jumbotron, Container } from "reactstrap";

const Header = () => {
  return (
    <div>
      <Jumbotron fluid id="head">
        <Container fluid>
          <h1 className="display-5">The URL-Shortner</h1>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Header;
