import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import CustomSpinner from "../components/CustomSpinner";
import { useAuth } from "../hooks/useAuth";
import { URL_API } from "../utils/url";

export default function LoginPage() {
  const { login } = useAuth();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isShowed, setIsShowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid = () => user.email.trim() && user.password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${URL_API}/login`, {
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
      console.log(data.user);

      login(
        data.user.id,
        data.user.username,
        data.user.profilPicture,
        data.token,
        data.user.gender,
        data.user.bio
      );

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
    setUser({ email: "", password: "" });
    setIsLoading(false);
  };

  return (
    <div
      className="container py-4 px-5 mt-5 col-lg-4 col-md-8 col-sm-10 border shadow rounded"
      style={{ backgroundColor: "white" }}
    >
      <h4 className="my-3 text-center">Login page</h4>
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
          <InputGroup className="mt-4 inputGroup">
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
            <InputGroupText className="icon">
              <FontAwesomeIcon
                icon={isShowed ? faEyeSlash : faEye}
                onClick={() => setIsShowed(!isShowed)}
              />
            </InputGroupText>
          </InputGroup>
        </FormGroup>
        <Button
          type="submit"
          color="primary"
          className="my-3 py-2 w-100 fw-bold buttonLogin"
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? <CustomSpinner /> : "Sign in"}
        </Button>
      </Form>
      <p className="text-center mt-2">
        Don&apos;t have an account?
        <br />
        <NavLink to="/register">Sign up</NavLink>
      </p>
    </div>
  );
}
