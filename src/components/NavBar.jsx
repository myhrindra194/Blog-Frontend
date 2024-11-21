import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Navbar, NavbarBrand } from "reactstrap";
import { useAuth } from "../hooks/useAuth";
import CustomLink from "./CustomLink";
import vite from "/vite.svg";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { token } = useAuth().user;

  return (
    <div className="sticky-top navBarBlured">
      <Navbar className="container py-2 navbar-expand-md">
        <NavbarBrand
          href="/"
          style={{
            color: "#101010",
            textDecoration: "none",
            fontFamily: "monospace",
          }}
        >
          <img src={vite} alt="Logo react" />
          HemiBlog
        </NavbarBrand>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token != null ? (
            <Button color="primary">
              <CustomLink to="/dashboard">DashBoard</CustomLink>
            </Button>
          ) : (
            <ButtonGroup>
              <Button outline color="primary">
                <Link
                  to="/login"
                  className="primary loginBtn"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
              </Button>
              <Button color="primary">
                <Link
                  to="/register"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Register
                </Link>
              </Button>
            </ButtonGroup>
          )}
        </div>
      </Navbar>
    </div>
  );
}
