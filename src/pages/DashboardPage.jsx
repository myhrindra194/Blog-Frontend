import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import {
  faAdd,
  faBars,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { URL_API } from "../utils/url";
import PostCard from "../components/PostCard";
import { filterPost } from "../utils/function";
import SearchBar from "../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSpinner from "../components/CustomSpinner";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";

export default function DashBoard() {
  const { id, token } = useAuth().user;
  const [post, setPost] = useState({ title: "", content: "", image: "" });
  const [postId, setPostId] = useState(0);
  const [userPosts, setUserPosts] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isFormValid = () => post.title.trim() && post.content.trim();

  useEffect(() => {
    fetch(`${URL_API}/blogs`)
      .then((response) => response.json())
      .then((data) => setUserPosts(data))
      .catch((error) => console.error(error));
  });

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
    setPost({ ...post, title: title, content: content });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${URL_API}/blogs/${postId}`, {
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

      setShowForm(false);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
    setIsEditing(false);
    setPost({ title: "", content: "", image: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      setIsLoading(true);
      try {
        const response = await fetch(`${URL_API}/blogs/${id}`, {
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

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setShowForm(false);
    setPost({ title: "", content: "", image: "" });
    setPostId(0);
  };

  const filteredPost = filterPost(userPosts, searchWord).filter(
    (post) => post.autorId == id
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <div className="col-8 p-4 offset-lg-2 offset-md-3">
          <div className="container">
            <SearchBar
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <h3 className="my-4">My Blog</h3>
            <Link
              style={{
                textDecoration: "none",
                backgroundColor: "#d0Eb97",
                color: "#101010",
                borderRadius: "15px",
                padding: "10px 15px",
              }}
              onClick={() => setShowForm(!showForm)}
            >
              <FontAwesomeIcon icon={faAdd} /> Add new post
            </Link>
            {showForm && (
              <Form
                action=""
                onSubmit={
                  isEditing
                    ? (e) => handleEditSubmit(e)
                    : (e) => handleSubmit(e)
                }
                className="border p-5 my-5"
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
                      setPost({ ...post, title: e.target.value })
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
                      setPost({ ...post, content: e.target.value })
                    }
                  />
                </FormGroup>
                {!isEditing && (
                  <FormGroup>
                    <Label for="content">Image</Label>
                    <Input id="image" name="image" type="file" />
                  </FormGroup>
                )}
                <Button
                  className="mb-4 float-end"
                  disabled={isLoading || !isFormValid()}
                  color="success"
                >
                  {isEditing ? "Validate" : "Add"}
                </Button>
                {isEditing && (
                  <Button disabled={isLoading} onClick={(e) => handleCancel(e)}>
                    Cancel
                  </Button>
                )}
                {isLoading && <Spinner />}
              </Form>
            )}
            {userPosts.length == 0 ? (
              <CustomSpinner />
            ) : filteredPost.length == 0 ? (
              <p className="mt-5">No item </p>
            ) : (
              <div className="mt-5">
                {filteredPost.map((post) => (
                  <PostCard key={post.id} post={post}>
                    {
                      <div className="dropdown col-7 d-flex justify-content-end">
                        <FontAwesomeIcon
                          icon={faBars}
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          size="xl"
                        />
                        <ul className="dropdown-menu">
                          <li>
                            <p
                              className="dropdown-item"
                              type="button"
                              onClick={() => {
                                setIsEditing(true);
                                setShowForm(true);
                                handleEdit(post.id, post.title, post.content);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} /> Edit post
                            </p>
                          </li>
                          <li>
                            <p
                              className="dropdown-item"
                              type="button"
                              onClick={() => handleDelete(post.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </p>
                          </li>
                        </ul>
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
