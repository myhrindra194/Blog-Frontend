import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, NavbarBrand } from "reactstrap";
import { useAuth } from "../hooks/useAuth";
import CustomLink from "./CustomLink";
import vite from "/vite.svg";

export default function NavBar() {
  const { token } = useAuth().user;

  return (
    <div className="sticky-top navBarBlured">
      <Nav className="container py-2 d-flex justify-content-between align-items-center">
        <NavbarBrand
          href="/"
          style={{
            color: "#101010",
            textDecoration: "none",
            fontFamily: "monospace",
          }}
        >
          <img src={vite} alt="Logo react" />
          <span> HemiBlog</span>
        </NavbarBrand>
        {token != null ? (
          <div>
            <button className="me-3">
              <CustomLink to="/profile">DashBoard</CustomLink>
            </button>
          </div>
        ) : (
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
        )}
      </Nav>
    </div>
  );
}
