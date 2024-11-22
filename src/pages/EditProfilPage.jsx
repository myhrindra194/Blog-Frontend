import { Form, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button, FormGroup, Input, Spinner } from "reactstrap";
import { useState } from "react";
import { URL_API } from "../utils/url";

export default function EditProfilePage() {
  const { user, editProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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
    <div className="row">
      <div className="col-8 p-4 offset-lg-2 offset-md-3">
        <Form action="" onSubmit={(e) => handleSubmit(e)} className="col-8">
          <FormGroup>
            <Input
              id="username"
              name="username"
              type="username"
              autoComplete="on"
              placeholder="New username"
              className="mt-5"
              required
            />
          </FormGroup>
          <FormGroup>
            <Input id="image" name="image" type="file" />
          </FormGroup>
          <Button
            color="primary"
            className="my-3 py-2 w-100 fw-bold buttonLogin"
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
    </div>
  );
}
