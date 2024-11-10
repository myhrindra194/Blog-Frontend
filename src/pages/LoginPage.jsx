import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText} from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function LoginPage() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [isShowed, setIsShowed] = useState(false);
    const navigate = useNavigate();

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

    const isFormValid = () => {
        const { email, password } = user;
        return (
            email.trim() &&
            password.trim()
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://blog-restfull-hahw.onrender.com/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': user.email, "password": user.password})
        })
        .then(res => {
            if(res.ok){
                res.json();
                alert("Login in success");
                navigate("/")
            }
            else {
                alert("Incorrect password");
                setUser({email:"", password:""})
            }
        }) 
        .then(data => console.log(data))
        .catch(error => console.error(error))
        
    }


   

    return(
        <div className="container py-4 px-5 shadow mt-5 border-rounded">
            <h3 className="my-3">Login page</h3>
            <Form action="" onSubmit={(e) => handleSubmit(e)} >
                <FormGroup>                    
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="on" 
                        value={user.email} 
                        onChange={(e) => handleChangeEmail(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <InputGroup>
                        <Input
                            id="password"
                            name="password"
                            type={isShowed ? "text": "password"} 
                            value={user.password} 
                            onChange={(e) => handleChangePassword(e)}
                        />
                        <InputGroupText>
                            <FontAwesomeIcon 
                                icon={(isShowed) ? faEyeSlash: faEye} 
                                onClick={() => setIsShowed(!isShowed)}
                            />
                        </InputGroupText>
                    </InputGroup>
                </FormGroup>
                <Button className="mb-4 "
                        disabled={!isFormValid()}
                >Login</Button>
            </Form>
            <p className="text-center">Don&apos;t have an account? 
                <NavLink to="/register"> Sign up</NavLink>
            </p>

        </div>
    )

}