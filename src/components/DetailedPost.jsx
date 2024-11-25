/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Label } from "reactstrap";
import profilePic from "../assets/profilePic.jpeg";
import { useAuth } from "../hooks/useAuth";
import { dateDiff } from "../utils/function";
import { URL_API } from "../utils/url";
import CommentCard from "./CommentCard";
import CustomLink from "./CustomLink";

export default function DetailedPost({ post, children }) {
  const { token } = useAuth().user;
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`${URL_API}/users/${post.authorId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, [post.authorId]);

  const dateStr = new Date(post.createdAt).toISOString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    token
      ? await fetch(`${URL_API}/blogs/${post.id}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: content }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setContent("");
          })
          .catch((error) => console.log(error))
      : navigate("/login");
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <img
            src={user.profilPicture == null ? profilePic : user.profilPicture}
            alt="Profile picture"
            className="img-thumbnail-fluid rounded-circle border-dark me-2"
            style={{ width: "50px", height: "50px" }}
          />
          <div>
            <small>
              <CustomLink to={`/users/${user.id}`}>{user.username}</CustomLink>
            </small>
            <small className="text-muted">
              <br />
              Posted since {dateDiff(dateStr)}
            </small>
          </div>

          {children}
        </div>
        <h5 className="card-title d-flex justify-content-between mt-4">
          {post.title}
        </h5>
        <p>{post.content}</p>

        {post.image != undefined && (
          <Link to={`/blogs/${post.id}`}>
            <img
              src={post.image}
              alt="image"
              className="img-fluid rounded imgPost"
              style={{
                height: "600px",
                width: "100%",
              }}
            />
          </Link>
        )}

        {post.comment.length == 0 ? (
          <p>No comments</p>
        ) : (
          <div>
            {post.comment.map((item) => (
              <CommentCard key={item.id} comment={item} />
            ))}
          </div>
        )}

        <form
          action=""
          className="mt-3 col-10"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Label for="content">Add comments</Label>
          <Input
            id="content"
            name="content"
            type="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Input>
          <Button
            type="submit"
            className="ms-auto d-block mt-3"
            disabled={content.trim() == ""}
          >
            Comment
          </Button>
        </form>
      </div>
    </div>
  );
}
