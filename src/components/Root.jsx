import { ButtonGroup, Nav, Button } from "reactstrap";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Root(){
    const { token } = useAuth();

    return(
        <div className="container">
            <Nav className="py-3 d-flex justify-content-between">
                <h3><Link to="/">My Blog</Link></h3>
                {
                    (!token) && 
                    <ButtonGroup>
                        <Button><Link to="/login">Login</Link></Button>
                        <Button outline><Link to="/register">Register</Link></Button>
                    </ButtonGroup>
                }
            </Nav>
            <Outlet />
        </div>
    )
}