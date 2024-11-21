import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function CustomLink({ children, to }) {
  return (
    <Link to={to} style={{ color: "white", textDecoration: "none" }}>
      {children}
    </Link>
  );
}
