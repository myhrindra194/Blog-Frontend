import {
  faArrowRightFromBracket,
  faBars,
  faHome,
  faUser,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Navbar, NavbarBrand } from "reactstrap";
import { useAuth } from "../hooks/useAuth";
import CustomLink from "./CustomLink";
import vite from "/vite.svg";
import { Link } from "react-router-dom";
import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { URL_API } from "../utils/url";

export default function NavBar() {
  const { id, token } = useAuth().user;
  const { logout } = useAuth();
  const [user, setUser] = useState([]);

  const handleLogout = () => logout();

  useEffect(() => {
    fetch(`${URL_API}/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  });

  console.log(user);
  

  return (
    <div className="sticky-top navBarBlured">
      <Navbar className="container py-2 navbar-expand-sm">
        <div className="d-flex align-items-center col-8">
          <NavbarBrand
            href="/"
            style={{
              color: "#101010",
              textDecoration: "none",
              fontFamily: "monospace",
            }}
          >
            <img src={vite} alt="Logo react" />
          </NavbarBrand>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div>
          <div
            className="collapse navbar-collapse me-5"
            id="navbarSupportedContent"
          >
            {token != null ? (
              <div className="d-flex">
                <Button color="primary">
                  <CustomLink to="/addPost">Create Post</CustomLink>
                </Button>
                <div className="dropdown d-flex align-items-center ms-3">
                  <img
                    className="img-fluid dropdown-toggle rounded-circle border"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    src={user.profilPicture}
                    alt="profile"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <ul className="dropdown-menu">
                    <li>
                      <p className="dropdown-item" type="button">
                        <Link
                          to={`/users/${id}`}
                          style={{
                            textDecoration: "none",
                            color: "#101010",
                          }}
                        >
                          <FontAwesomeIcon icon={faUser} /> My profile
                        </Link>
                      </p>
                    </li>
                    <li>
                      <p className="dropdown-item" type="button">
                        <Link
                          to={`/editProfile`}
                          style={{
                            textDecoration: "none",
                            color: "#101010",
                          }}
                        >
                          <FontAwesomeIcon icon={faUserEdit} /> Edit profile
                        </Link>
                      </p>
                    </li>
                    <li>
                      <p className="dropdown-item" type="button">
                        <Link
                          to="/dashboard"
                          style={{
                            textDecoration: "none",
                            color: "#101010",
                          }}
                        >
                          <FontAwesomeIcon icon={faHome} /> Dashboard
                        </Link>
                      </p>
                    </li>
                    <li>
                      <p className="dropdown-item" type="button">
                        <Link
                          to="/addPost"
                          style={{
                            textDecoration: "none",
                            color: "#101010",
                          }}
                        >
                          <FontAwesomeIcon icon={faIdCard} /> Create post
                        </Link>
                      </p>
                    </li>
                    <li>
                      <p
                        className="dropdown-item"
                        type="button"
                        onClick={handleLogout}
                      >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log
                        out
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <Button color="light">
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                </Button>
                <Button color="primary" outline>
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
}
