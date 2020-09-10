import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    // document.clearCookie("jwt");
    history.push("/");
  };

  return (
    <Navbar className="navbar navbar-dark bg-dark" expand="md">
      <NavLink className="navbar-brand navhead" to="/home">
        URL-Shortner
      </NavLink>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink className="nav-link balsa" to="/createUrl">
              shortner
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link balsa" to="/database">
              database
            </NavLink>
          </NavItem>
        </Nav>
        <form className="form-inline">
          <button className="btn btn-danger" type="button" onClick={logout}>
            Logout
          </button>
        </form>
      </Collapse>
    </Navbar>
  );
};

export default Header;
