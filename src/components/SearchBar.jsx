import { Input } from "reactstrap";

/* eslint-disable react/prop-types */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="col-6 mt-3 mb-5">
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
