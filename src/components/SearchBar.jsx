import { Input } from "reactstrap";

/* eslint-disable react/prop-types */
export default function SearchBar({ value, onChange }) {
  return (
    <Input
      className="inputSearch py-2"
      name="search"
      value={value}
      onChange={onChange}
      placeholder="Search post"
    />
  );
}
