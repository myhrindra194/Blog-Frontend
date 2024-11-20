import {
  faAdd,
  faEdit,
  faHomeLgAlt,
  faSignOut,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons/faDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { URL_API } from "../utils/url";

export default function SideBar() {
  const { id } = useAuth().user;
  const { logout } = useAuth();

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`${URL_API}/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div
      className="col-lg-2 col-md-3 col-sm-3 col-xs-3 sidebar fixed-top pt-5 px-4"
      style={{ height: "100vh" }}
    >
      <nav className="nav flex-column sticky ">
        <div className="d-flex justify-content-center">
          {user.profilPicture == null ? (
            <FontAwesomeIcon icon={faUserCircle} size="xl" />
          ) : (
            <img
              src={user.profilPicture}
              alt="profile"
              className="img-thumbnail-fluid rounded-circle border"
              style={{ width: "75px", height: "75px" }}
            />
          )}
        </div>
        <p className="text-center my-3">
          {" "}
          Welcome <strong>{user.username}</strong>
        </p>
        <Link
          to="/editProfile"
          style={{ textDecoration: "none", color: "#101010" }}
          className="dashboardLink"
        >
          <FontAwesomeIcon icon={faEdit} /> Edit profile
        </Link>
        <Link
          to={"/addPost"}
          style={{
            textDecoration: "none",
            color: "#101010",
          }}
          className="dashboardLink"
        >
          <FontAwesomeIcon icon={faAdd} /> Add new post
        </Link>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "#101010" }}
          className="dashboardLink"
        >
          <FontAwesomeIcon icon={faHomeLgAlt} /> Home
        </Link>
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "#101010" }}
          className="dashboardLink"
        >
          <FontAwesomeIcon icon={faDashboard} /> Dashboard
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
  );
}
