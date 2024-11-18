import { faAdd, faEdit, faHomeLgAlt, faSignOut, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons/faDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function SideBar() {
    const {username} = useAuth().user;
    const {logout} = useAuth();

    return(
        <div
          className="col-lg-2 col-md-3 col-sm-3 col-xs-3 sidebar fixed-top pt-5 px-4"
          style={{ height: "100vh" }}
        >
          <nav className="nav flex-column sticky ">
            <div className="d-flex justify-content-center">
              <FontAwesomeIcon icon={faUserCircle} size="xl" />
            </div>
            <p className="text-center my-3">
              {" "}
              Welcome <strong>{username}</strong>
            </p>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "#101010" }}
              className="dashboardLink"
            >
              <FontAwesomeIcon icon={faEdit} /> Edit profile
            </Link>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "#101010" }}
              className="dashboardLink"
            >
              <FontAwesomeIcon icon={faHomeLgAlt} /> Home
            </Link>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "#101010" }}
              className="dashboardLink"
            >
              <FontAwesomeIcon icon={faDashboard} /> Dashboard
            </Link>
            <Link
              className="dashboardLink"
              style={{ textDecoration: "none", color: "#101010" }}
            //   onClick={() => setShowForm(!showForm)}
            >
              <FontAwesomeIcon icon={faAdd} /> Add new post
            </Link>

            <Link
              to="/login"
              className="dashboardLink"
              style={{ textDecoration: "none", color: "#101010" }}
              onClick={() => logout()}
            >
              <FontAwesomeIcon icon={faSignOut} /> Log out
            </Link>
          </nav>
        </div>
    )
}