import { ButtonGroup, Nav, Button } from "reactstrap";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Root(){
    const { token, logout } = useAuth();

    const handleLogout = () =>  logout();

    return (
        <div className="container">
            <Nav className="py-3 d-flex justify-content-between ">
                <h3><Link to="/">My Blog</Link></h3>
                {
                    (!token) ?
                    <ButtonGroup>
                        <Button><Link to="/login">Login</Link></Button>
                        <Button outline><Link to="/register">Register</Link></Button>
                    </ButtonGroup>:
                    <div>
                        <Button className="me-3"><Link to="/profile">DashBoard</Link></Button>
                        <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} size="xl"/>
                    </div>
                }
            </Nav>
            <Outlet />
        </div>
    )
}