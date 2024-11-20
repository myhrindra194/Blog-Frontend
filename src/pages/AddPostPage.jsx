import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { URL_API } from "../utils/url";

export default function AddPostPage() {
  const { token } = useAuth().user;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(`${URL_API}/blogs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: new FormData(e.target),
      });
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };
  return (
    <Form
      action=""
      onSubmit={(e) => handleSubmit(e)}
      className="border p-5 my-5"
    >
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="title"
          autoComplete="on"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="content">Content</Label>
        <Input
          id="content"
          name="content"
          type="textarea"
          style={{ height: "16vh" }}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="content">Image</Label>
        <Input id="image" name="image" type="file" />
      </FormGroup>
      <Button className="mb-4 float-end" color="success">
        Add
      </Button>
      {isLoading && <Spinner />}
    </Form>
  );
}
