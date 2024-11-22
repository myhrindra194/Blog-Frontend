/* eslint-disable react/prop-types */
import { Input } from "reactstrap";

export default function SearchBar({ value, onChange }) {
  return (
    <div>
      <Input
        name="search"
        value={value}
        onChange={onChange}
        placeholder="Search post"
      />
    </div>
  );
}
