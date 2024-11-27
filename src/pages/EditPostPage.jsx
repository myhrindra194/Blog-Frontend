import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup, Form, FormGroup, Input, Label } from "reactstrap";
import CustomSpinner from "../components/CustomSpinner";
import { useAuth } from "../hooks/useAuth";
import { URL_API } from "../utils/url";

export default function EditPostPage() {
  const { idPost } = useParams();
  const { token } = useAuth().user;
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${URL_API}/blogs/${idPost}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error(error));
  }, [idPost]);

  const { title, content } = post;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${URL_API}/blogs/${idPost}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...post,
          title: title,
          content: content,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="container col-md-6 col-12">
      <Form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="border p-5 my-5"
        style={{ backgroundColor: "white" }}
      >
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="title"
            autoComplete="on"
            value={title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content</Label>
          <Input
            id="content"
            name="content"
            type="textarea"
            style={{ height: "16vh" }}
            value={content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </FormGroup>
        <ButtonGroup className="float-end">
          <Button
            color="danger"
            onClick={() => navigate("/dashboard")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button color="success" disabled={isLoading} type="submit">
            {isLoading ? <CustomSpinner /> : "Validate"}
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
}
