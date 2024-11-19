import { Input } from "reactstrap";

/* eslint-disable react/prop-types */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="col-md-6 col-sm-10 mb-5">
      <Input
        className="py-2"
        name="search"
        value={value}
        onChange={onChange}
        placeholder="Search post"
      />
    </div>
  );
}
