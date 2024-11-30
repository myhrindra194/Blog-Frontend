/* eslint-disable react/prop-types */
import { Input } from "reactstrap";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="col-12 ">
      <Input
        name="search"
        value={value}
        onChange={onChange}
        placeholder="Search post"
      />
    </div>
  );
}
