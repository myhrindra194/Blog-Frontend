import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faBars,
  faHome,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { Button, Navbar, NavbarBrand } from "reactstrap";
import female from "../assets/female.png";
import male from "../assets/male.png";
import { useAuth } from "../hooks/useAuth";
import CustomLink from "./CustomLink";
import vite from "/vite.svg";

export default function NavBar() {
  const { id, username, profilPicture, token, gender } = useAuth().user;
  const { logout } = useAuth();
  const navigate = useNavigate();
  const defaultProfilPicture = gender === "F" ? female : male;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sticky-top navBarBlured">
      <Navbar className="container py-2 navbar-expand-md">
        <div className="d-flex align-items-center">
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
        {token == null ? (
          <>
            <button
              className="navbar-toggler ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="ms-auto d-blocka">
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
            </div>
          </>
        ) : (
          <div className="dropdown d-flex align-items-center">
            <img
              className="img-fluid dropdown-toggle rounded-circle border"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              src={profilPicture ? profilPicture : defaultProfilPicture}
              alt="profile"
              style={{ width: "40px", height: "40px" }}
            />
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <p className="dropdown-item" type="button">
                  <CustomLink to={`/users/${id}`}>{username}</CustomLink>
                </p>
              </li>
              <li>
                <p className="dropdown-item" type="button">
                  <CustomLink to={`/users/${id}/editProfile`}>
                    <FontAwesomeIcon icon={faUserEdit} /> Edit profile
                  </CustomLink>
                </p>
              </li>
              <li>
                <p className="dropdown-item" type="button">
                  <CustomLink to="/dashboard">
                    <FontAwesomeIcon icon={faHome} /> Dashboard
                  </CustomLink>
                </p>
              </li>
              <li>
                <p className="dropdown-item" type="button">
                  <CustomLink to="/addPost">
                    <FontAwesomeIcon icon={faIdCard} /> Create post
                  </CustomLink>
                </p>
              </li>
              <li>
                <p
                  className="dropdown-item"
                  type="button"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out
                </p>
              </li>
            </ul>
          </div>
        )}
      </Navbar>
    </div>
  );
}
