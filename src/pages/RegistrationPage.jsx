import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText} from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function RegistrationPage() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword:""
    });

    const [isShowed, setIsShowed] = useState({
        password: false,
        confirmPassword: false,
    });



    const handleChangeFirstName = (e) => {
        setUser({
            ...user,
            firstName: e.target.value
        })
    }

    const handleChangeLastName = (e) => {
        setUser({
            ...user,
            lastName: e.target.value
        })
    }

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

    const handleChangeConfirmPassword = (e) => {
        setUser({
            ...user,
            confirmPassword: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    const isFormValid = () => {
        const { firstName, lastName, email, password, confirmPassword } = user;
        return (
            firstName.trim() &&
            lastName.trim() &&
            email.trim() &&
            password.length >= 6 &&
            password === confirmPassword
        );
    };


    return(
        <div className="container py-4 px-5 w-50 shadow mt-5 border-rounded">
            <h3 className="my-3">Registration page</h3>
            <Form action="">
                <FormGroup>
                    <Label for="firstname">Firstname</Label>
                    <Input  
                        name="firstame"
                        type="text" 
                        value={user.firstName} 
                        onChange={(e) => handleChangeFirstName(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="lastname">Lastname</Label>
                    <Input
                        name="lastname"
                        type="text"
                        value={user.lastName} 
                        onChange={(e) => handleChangeLastName(e)}
                    />
                </FormGroup>
                <FormGroup>                    
                    <Label for="email">Email</Label>
                    <Input
                        name="email" 
                        type="email" 
                        value={user.email} 
                        onChange={(e) => handleChangeEmail(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Create password</Label>
                    <InputGroup>
                        <Input
                            name="password"
                            type={isShowed.password ? "text": "password"} 
                            value={user.password} 
                            onChange={(e) => handleChangePassword(e)}
                        />
                        <InputGroupText>
                            <FontAwesomeIcon 
                                icon={isShowed.password ? faEyeSlash: faEye} 
                                onClick={() =>
                                    setIsShowed((prevState) => ({
                                        ...prevState,
                                        password: !prevState.password,
                                }))}
                            />
                        </InputGroupText>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Confirm password</Label>
                    <InputGroup>
                        <Input 
                            name="confirmPassword"
                            type={isShowed.confirmPassword ? "text": "password"} 
                            value={user.confirmPassword} 
                            onChange={(e) => handleChangeConfirmPassword(e)}
                        />
                        <InputGroupText>
                            <FontAwesomeIcon 
                                icon={isShowed.confirmPassword ? faEyeSlash: faEye} 
                                onClick={() =>
                                    setIsShowed((prevState) => ({
                                        ...prevState,
                                        confirmPassword: !prevState.confirmPassword,
                                }))}
                            />
                        </InputGroupText>
                    </InputGroup>
                </FormGroup>
                <Button 
                    onSubmit={(e) => handleSubmit(e)} 
                    disabled={!isFormValid()}
                >Register</Button>
            </Form>
            <p className="text-center">Already have an account? 
                <NavLink to="/login"> Sign up</NavLink>
            </p>

        </div>
    )

}