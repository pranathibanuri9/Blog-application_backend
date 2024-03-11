import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState,useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { doLogout, geturrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

function CustomNavbar(args) {
  const userContexData=useContext(userContext)
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(geturrentUserDetail());
  }, [login]);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    doLogout(() => {
      //
      setLogin(false);
      userContexData.setUser(
        {
          data:null,
          login:false
        }
      )
      navigate("/");
    });
  };

  return (
    <div>
      <Navbar
        color="dark"
        light="true"
        dark="true"
        expand="md"
        className="px-5"
      >
        <NavbarBrand tag={ReactLink} to="/">
          MyBlogs
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                New Feed
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">
                services
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/services">
                  Contact Us
                </DropdownItem>
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>LinkedIN</DropdownItem>
                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem>Youtube</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {login && (
              <>
              <NavItem>
              <NavLink tag={ReactLink} to={`/user/profile/${user.id}`} >
                profile Info
              </NavLink>
            </NavItem>
                
                <NavItem >
                  <NavLink tag={ReactLink} to="/user/dashboard">Create_new post</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>

              </>
            )}
            {!login && (
              <>
                
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
