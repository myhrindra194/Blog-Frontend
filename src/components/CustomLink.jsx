import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function CustomLink({ children, to }) {
  return (
    <Link to={to} style={{ color: "#101010", textDecoration: "none" }}>
      {children}
    </Link>
  );
}
