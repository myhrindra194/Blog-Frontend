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
import { URL_API } from "../utils/url";

export default function RegistrationPage() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilPicture: "",
    gender: "",
    bio: "",
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
      const response = await fetch(`${URL_API}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.userName,
          email: user.email,
          password: user.password,
          profilPicture: user.profilPicture,
          gender: user.gender,
          bio: user.bio,
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
    setUser({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilPicture: "",
      gender: "",
      bio: "",
    });
    setIsLoading(false);
  };

  return (
    <div
      className="registerPage container py-4 px-5 my-5 col-lg-4 col-md-8 col-sm-12 border shadow rounded"
      style={{ backgroundColor: "white" }}
    >
      <h4 className="my-3 text-center">Registration</h4>
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
        <FormGroup>
          <Input
            id="gender"
            name="gender"
            type="select"
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          >
            <option>Male</option>
            <option>Female</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Input
            className="mt-4"
            id="profilPicture"
            name="profilPicture"
            type="file"
            value={user.profilPicture}
            onChange={(e) =>
              setUser({
                ...user,
                profilPicture: e.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Input
            className="mt-4"
            placeholder="Add bio"
            id="bio"
            name="bio"
            type="textarea"
            value={user.bio}
            onChange={(e) =>
              setUser({
                ...user,
                bio: e.target.value,
              })
            }
          />
        </FormGroup>

        <Button
          type="submit"
          color="primary"
          className="buttonRegister w-100 py-2 fw-bold mt-2"
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? <CustomSpinner /> : "Register"}
        </Button>
      </Form>
      <p className="text-center my-3">
        Already have an account?
        <NavLink to="/login">Sign in</NavLink>
      </p>
    </div>
  );
}
