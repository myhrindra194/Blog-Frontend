import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Nav } from "reactstrap";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
    const { token, logout } = useAuth();

    const handleLogout = () => logout();

    return(

       <div className="sticky-top border-bottom bg-light">
            <Nav className="py-3 d-flex justify-content-between container">
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
       </div>
    )
}