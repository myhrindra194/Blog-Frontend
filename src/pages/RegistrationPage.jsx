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
  Label,
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
    gender: "Male",
    bio: "",
  });

  const [isShowed, setIsShowed] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const isFormValid = () => {
    const { password, confirmPassword } = user;
    return (
      password.trim() && confirmPassword.trim() && password === confirmPassword
    );
  };

  const handleClickBack = () => setStep(step - 1);
  const handleClickNext = () => setStep(step + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(
      JSON.stringify({
        username: user.userName,
        email: user.email,
        password: user.password,
        profilPicture: user.profilPicture,
        gender: user.gender,
        bio: user.bio,
      })
    );

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
      console.log(response.json());

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
      <div className="d-flex justify-content-between align-items-center my-4">
        <h4>Registration</h4>
        <h6>Steps {step} / 3</h6>
      </div>
      <Form action="" onSubmit={(e) => handleSubmit(e)}>
        {step === 1 && (
          <>
            <FormGroup>
              <Label for="userName">Username</Label>
              <Input
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
              <Label for="userName">Email</Label>
              <Input
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
              <Label for="userName">Select your gender</Label>
              <Input
                id="gender"
                name="gender"
                type="select"
                value={user.gender}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Input>
            </FormGroup>
            <Button
              color="primary"
              className="d-block ms-auto mt-5"
              onClick={handleClickNext}
              disabled={user.userName.trim() === "" || user.email.trim() === ""}
            >
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <FormGroup>
              <Label for="profilPicture">Add a profil picture</Label>
              <Input
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
              <Label for="bio">Biography</Label>
              <Input
                placeholder="Add a bio"
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
            <div className="d-flex justify-content-between">
              <Button onClick={handleClickBack}>Back</Button>
              <Button onClick={handleClickNext} color="primary">
                Next
              </Button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
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
            <div className="d-flex justify-content-between">
              <Button onClick={handleClickBack} disabled={isLoading}>
                Back
              </Button>
              <Button
                type="submit"
                color="primary"
                className="buttonRegister"
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? <CustomSpinner /> : "Register"}
              </Button>
            </div>
          </>
        )}
      </Form>
      <p className="text-center my-3">
        Already have an account?
        <br />
        <NavLink to="/login">Sign in</NavLink>
      </p>
    </div>
  );
}
