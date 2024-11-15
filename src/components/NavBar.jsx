import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, NavbarBrand } from "reactstrap";
import { useAuth } from "../hooks/useAuth";
import CustomLink from "./CustomLink";
import vite from "/vite.svg";

export default function NavBar() {
  const { token, logout } = useAuth();

  const handleLogout = () => logout();

  return (
    <div className="sticky-top navBarBlured">
      <Nav className="container py-2 d-flex justify-content-between align-items-center">
        <NavbarBrand
          href="/"
          style={{ color: "#101010", textDecoration: "none", fontFamily:"monospace"}}
        >
          <img
            src={vite}
            alt="Logo react"
          />
          <span> HemiBlog</span>
        </NavbarBrand>
        {!token ? (
          <div className="justify-content-between">
            <button className="buttonLogin">
              <CustomLink to="/login">
                <FontAwesomeIcon icon={faUser} /> Login
              </CustomLink>
            </button>
            <button>
              <CustomLink to="/register">Register</CustomLink>
            </button>
          </div>
        ) : (
          <div>
            <button className="me-3">
              <CustomLink to="/profile">DashBoard</CustomLink>
            </button>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              onClick={handleLogout}
              size="xl"
              a
            />
          </div>
        )}
      </Nav>
    </div>
  );
}
