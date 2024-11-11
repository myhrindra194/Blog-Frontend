import { Button } from "reactstrap";
import { useAuth } from "../hooks/useAuth"

export default function ProfilePage(){
   const { logout } = useAuth();
   
   const handleLogOut = () => {
        logout();
   }
    return (
        <>
            <p>Hello, you are connected</p>
            <Button onClick={handleLogOut}>Logout</Button>
        </>
    )
}