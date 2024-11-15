import { useState } from "react";
import {
  Button,
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
import { useAuth } from "../hooks/useAuth";
import { URL } from "../utils/url";

export default function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isShowed, setIsShowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const isFormValid = () => user.email.trim() && user.password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      if (!response.ok) {
        throw new Error("Incorrect password");
      }

      const data = await response.json();

      login(data.user.id, data.token);

      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
    setUser({ email: "", password: "" });
    setIsLoading(false);
  };

  return (
    <div className="container py-4 px-5 shadow mt-5 col-lg-4 col-md-8 col-sm-12">
      <h3 className="my-3 text-center">Login page</h3>
      <Form action="" onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="on"
            placeholder="Email"
            className="mt-5"
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
          <InputGroup className="mt-4">
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type={isShowed ? "text" : "password"}
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
                icon={isShowed ? faEyeSlash : faEye}
                onClick={() => setIsShowed(!isShowed)}
              />
            </InputGroupText>
          </InputGroup>
        </FormGroup>
        <Button
          className="my-3 w-100 rounded"
          disabled={!isFormValid() || isLoading}
        >
          Login
        </Button>
      </Form>
      <p className="text-center mt-2">
        Don&apos;t have an account?
        <NavLink to="/register"> Sign up</NavLink>
      </p>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
