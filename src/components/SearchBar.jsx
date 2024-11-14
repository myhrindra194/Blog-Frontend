import { Input } from "reactstrap";

/* eslint-disable react/prop-types */
export default function SearchBar({value, onChange}) {
    return(
        <div className="col-6">
            <Input value={value} onChange={onChange} placeholder="Search post"/>   
        </div>
    )
}