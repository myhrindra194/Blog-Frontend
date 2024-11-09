import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText} from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function LoginPage() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [isShowed, setIsShowed] = useState(false);
   

    const handleChangeEmail = (e) => {
        setUser({
            ...user,
            email: e.target.value
        })
    }

    const handleChangePassword = (e) => {
        setUser({
            ...user,
            password: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
   

    return(
        <div className="container py-4 px-5 w-25 shadow mt-5 border-rounded">
            <h3 className="my-3">Login page</h3>
            <Form action="">
                <FormGroup>                    
                    <Label for="email">Email</Label>
                    <Input type="email" value={user.email} onChange={(e) => handleChangeEmail(e)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <InputGroup>
                        <Input type={isShowed ? "text": "password"} value={user.password} onChange={(e) => handleChangePassword(e)}/>
                        <InputGroupText>
                            <FontAwesomeIcon icon={(isShowed) ? faEyeSlash: faEye} onClick={() => setIsShowed(!isShowed)}/>
                        </InputGroupText>
                    </InputGroup>
                </FormGroup>
                <Button className="mb-4 "
                        onSubmit={(e) => handleSubmit(e)} 
                        disabled={!(user.email.trim() != "" && user.password.trim().length > 5)}
                >Login</Button>
            </Form>
            <p className="text-center">Don&apos;t have an account? 
                <NavLink to="/register"> Sign in</NavLink>
            </p>

        </div>
    )

}