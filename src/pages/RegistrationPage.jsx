import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Spinner,
} from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { URL } from "../utils/url";

export default function RegistrationPage() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isShowed, setIsShowed] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid = () => {
    const { userName, email, password, confirmPassword } = user;
    return userName.trim() && email.trim() && password === confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.userName,
          email: user.email,
          password: user.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Email already taken");
      }

      alert("Registration in success");
      navigate("/login");
    } catch (errors) {
      alert(errors);
    }
    setUser({ userName: "", email: "", password: "", confirmPassword: "" });
    setIsLoading(false);
  };

  return (
    <div className="container py-4 px-5 shadow my-3 border-rounded col-lg-4 col-md-8 col-sm-12">
      <h3 className="my-3">Registration page</h3>
      <Form action="" onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Label for="userName">Username</Label>
          <Input
            id="userName"
            name="userName"
            autoComplete="on"
            type="text"
            value={user.userName}
            onChange={(e) =>
              setUser({
                ...user,
                userName: e.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            autoComplete="on"
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Create password</Label>
          <InputGroup>
            <Input
              id="password"
              name="password"
              type={isShowed.password ? "text" : "password"}
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
            />
            <InputGroupText>
              <FontAwesomeIcon
                icon={isShowed.password ? faEyeSlash : faEye}
                onClick={() =>
                  setIsShowed((prevState) => ({
                    ...prevState,
                    password: !prevState.password,
                  }))
                }
              />
            </InputGroupText>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm password</Label>
          <InputGroup>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={isShowed.confirmPassword ? "text" : "password"}
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({
                  ...user,
                  confirmPassword: e.target.value,
                })
              }
            />
            <InputGroupText>
              <FontAwesomeIcon
                icon={isShowed.confirmPassword ? faEyeSlash : faEye}
                onClick={() =>
                  setIsShowed((prevState) => ({
                    ...prevState,
                    confirmPassword: !prevState.confirmPassword,
                  }))
                }
              />
            </InputGroupText>
          </InputGroup>
        </FormGroup>
        <Button disabled={!isFormValid() || isLoading}>Register</Button>
      </Form>
      <p className="text-center">
        Already have an account?
        <NavLink to="/login"> Sign in</NavLink>
      </p>

      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
