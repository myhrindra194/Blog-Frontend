import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { URL_API } from "../utils/url";
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

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
          title: post.title,
          content: post.content,
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-8 p-4 offset-lg-2 offset-md-3">
          <div className="container">
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
                  onChange={(e) =>
                    setPost({ ...post, content: e.target.value })
                  }
                />
              </FormGroup>
              <ButtonGroup className="mb-4 float-end">
                <Button
                  color="danger"
                  onClick={() => navigate("/dashboard")}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button color="success" disabled={isLoading}>
                  Validate
                </Button>
              </ButtonGroup>
              {isLoading && <Spinner />}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
