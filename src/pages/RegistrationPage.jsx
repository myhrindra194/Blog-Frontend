import { useState } from "react";
import {
  Form,
  FormGroup,
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
      const response = await fetch(`${URL}/users/register`, {
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
    <div className="registerPage container py-4 px-5 my-5 col-xl-3 col-lg-4 col-md-8 col-sm-12">
      <h4 className="my-3" style={{ fontFamily: "monospace" }}>
        Registration
      </h4>{" "}
      <Form action="" onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Input
            className="mt-4"
            placeholder="Username"
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
          <Input
            className="mt-4"
            placeholder="Email"
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
          <InputGroup className="mt-4 inputGroup">
            <Input
              placeholder="Create password"
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
            <InputGroupText className="icon">
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
          <InputGroup className="mt-4 inputGroup">
            <Input
              placeholder="Confirm password"
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
            <InputGroupText className="icon">
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
        <button
          className="buttonRegister w-100 py-2 fw-bold mt-2"
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          ) : (
            "Register"
          )}
        </button>
      </Form>
      <p className="text-center my-3">
        Already have an account?
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <br />
          Sign in
        </NavLink>
      </p>
    </div>
  );
}
