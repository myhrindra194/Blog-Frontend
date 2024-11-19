import { Form } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useAuth } from "../hooks/useAuth";
import { FormGroup, Input, Spinner } from "reactstrap";
import { useState } from "react";
import { URL } from "../utils/url";

export default function EditProfilePage() {
  const { id, token } = useAuth().user;
  const [isLoading , setIsLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const data = new FormData(e.target);
        
        const response = await fetch(`${URL}/users/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data,
        });
        console.log(response);
    }
     catch (error) {
        alert(error);
    }
    setIsLoading(false);
    
  }

  return (
    <div className="row">
      <SideBar />
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
          />
        </FormGroup>
        <FormGroup>
            <Input
              id="profilePicture"
              name="profilePicture"
              type="file"
            />
        </FormGroup>
        <button
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
        </button>
      </Form>
      </div>
      
    </div>
  );
}
