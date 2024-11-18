import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { URL } from "../utils/url";
import PostCard from "../components/PostCard";
import { filterPost } from "../utils/function";
import SearchBar from "../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSpinner from "../components/CustomSpinner";
import SideBar from "../components/SideBar";

export default function DashBoard() {
  const { id, token } = useAuth().user;
  const [post, setPost] = useState({ title: "", content: "" });
  const [postId, setPostId] = useState(0);
  const [userPosts, setUserPosts] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isFormValid = () => post.title.trim() && post.content.trim();

  useEffect(() => {
    fetch(`${URL}/blogs`)
      .then((response) => response.json())
      .then((data) => setUserPosts(data))
      .catch((error) => console.error(error));
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const method = isEditing ? "PATCH" : "POST";
    const endpoint = isEditing ? `${URL}/blogs/${postId}` : `${URL}/blogs`;

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: post.title, content: post.content }),
      });
      const data = await response.json();
      console.log(data);

      setPost({ title: "", content: "" });
      setShowForm(false);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  const handleEdit = (id, title, content) => {
    setShowForm(true);
    setIsEditing(true);
    setPostId(id);
    setPost({ title: title, content: content });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      setIsLoading(true);
      try {
        const response = await fetch(`${URL}/blogs/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
      setIsEditing(false);
    }
  };
  const filteredPost = filterPost(userPosts, searchWord).filter(
    (post) => post.autorId == id
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <div className="col-9 p-4 offset-lg-2 offset-md-3">
          <div className="container">
            <SearchBar
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <h3 className="my-4">My Blog</h3>
            {showForm && (
              <Form
                action=""
                onSubmit={(e) => handleSubmit(e)}
                className="col-8 border p-5 my-5"
              >
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="on"
                    value={post.title}
                    onChange={(e) =>
                      setPost({
                        ...post,
                        title: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="content">Content</Label>
                  <Input
                    id="content"
                    name="content"
                    type="textarea"
                    style={{ height: "16vh" }}
                    value={post.content}
                    onChange={(e) =>
                      setPost({
                        ...post,
                        content: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <Button
                  className="mb-4 float-end"
                  disabled={!isFormValid() || isLoading}
                  color="success"
                >
                  {isEditing ? "Validate" : "Add"}
                </Button>
                {isEditing && (
                  <Button
                    disabled={isLoading}
                    onClick={() => {
                      setPost({ title: "", content: "" });
                      setShowForm(false);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
                {isLoading && <Spinner />}
              </Form>
            )}
            {userPosts.length == 0 ? (
              <CustomSpinner />
            ) : filteredPost.length == 0 ? (
              <p>No item </p>
            ) : (
              <div className="row gap-5">
                {filteredPost.map((post) => (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    content={post.content}
                  >
                    {
                      <div>
                        <FontAwesomeIcon
                          icon={faEdit}
                          color="primary"
                          onClick={() =>
                            handleEdit(post.id, post.title, post.content)
                          }
                        />
                        <span>{"  "}</span>
                        <FontAwesomeIcon
                          icon={faTrash}
                          color="danger"
                          onClick={() => handleDelete(post.id)}
                        />
                      </div>
                    }
                  </PostCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
