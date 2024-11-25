import { useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Button, FormGroup, Input, Spinner } from "reactstrap";
import { useAuth } from "../hooks/useAuth";
import { URL_API } from "../utils/url";

export default function EditProfilePage() {
  const { user, editProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(user.profilPicture);
  const myRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let res;
    try {
      const data = new FormData(e.target);

      const response = await fetch(`${URL_API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });
      res = await response.json();
    } catch (error) {
      alert(error);
    }

    editProfile(res.username, res.profilPicture);
    setIsLoading(false);
    navigate(`/users/${user.id}`);
  };

  return (
    <div className="container py-5">
      <Form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="border shadow p-5"
      >
        <FormGroup>
          <Input
            id="username"
            name="username"
            type="username"
            autoComplete="on"
            placeholder="New username"
            className="mt-5"
            defaultValue={user.username}
            required
          />
        </FormGroup>
        <FormGroup className="d-flex align-items-center">
          <img
            src={image}
            alt="profile"
            style={{ width: "70px", height: "70px" }}
            className="rounded-circle img-fluid"
          />
          <input
            id="image"
            name="image"
            type="file"
            className="ms-3"
            ref={myRef}
            onChange={() =>
              setImage(URL.createObjectURL(myRef.current.files[0]))
            }
          />
        </FormGroup>
        <Button
          color="primary"
          className="my-3 w-100 fw-bold buttonLogin"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          ) : (
            "Save changes"
          )}
        </Button>
      </Form>
    </div>
  );
}
