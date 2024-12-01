/* eslint-disable react/prop-types */

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Label } from "reactstrap";
import profilePic from "../assets/profilePic.jpeg";
import { useAuth } from "../hooks/useAuth";
import { checkIfLiked, dateDiff } from "../utils/function";
import { URL_API } from "../utils/url";
import CommentCard from "./CommentCard";
import CustomLink from "./CustomLink";
import CustomSpinner from "./CustomSpinner";

export default function DetailedPost({ post, children }) {
  const { token, id } = useAuth().user;
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(checkIfLiked(post, id));
  const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);
  const navigate = useNavigate();

  const dateStr = new Date(post.createdAt).toISOString();
  const usersLiking = post.likes.map((item) => item.likerId);

  useEffect(() => {
    fetch(`${URL_API}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, [post.id]);

  const handleLike = async (id) => {
    setIsLiked(!isLiked);
    isLiked
      ? setNumberOfLikes(numberOfLikes - 1)
      : setNumberOfLikes(numberOfLikes + 1);
    try {
      const res = await fetch(`${URL_API}/blogs/${id}/reaction`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
            setIsLoading(false);
            navigate(0);
          })
          .catch((error) => console.log(error))
      : navigate("/login");
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <img
            src={
              post.author.profilPicture == null
                ? profilePic
                : post.author.profilPicture
            }
            alt="Profile picture"
            className="img-thumbnail-fluid rounded-circle border-dark me-2"
            style={{ width: "50px", height: "50px" }}
          />
          <div>
            <small>
              <CustomLink to={`/users/${post.author.id}`}>
                {post.author.username}
              </CustomLink>
            </small>
            <small className="text-muted">
              <br />
              {dateDiff(dateStr)}
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
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-start">
            <FontAwesomeIcon
              icon={isLiked ? faHeartCircleCheck : faHeart}
              style={{ color: isLiked ? "red" : "black" }}
              onClick={() => (token ? handleLike(post.id) : navigate("/login"))}
              size="lg"
            />
            <div className="dropdown">
              <p
                className="dropdown ms-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                {numberOfLikes} like{numberOfLikes > 1 && "s"}
              </p>
              <ul
                className="dropdown-menu px-2 "
                style={{ maxHeight: "30vh", overflowY: "scroll" }}
              >
                {users
                  .filter((user) => usersLiking.includes(user.id))
                  .map((user) => (
                    <li
                      key={user.id}
                      className="d-flex border-bottom py-2"
                      style={{ width: "15vw" }}
                    >
                      <img
                        className="rounded-circle border img-fluid me-3"
                        src={user.profilPicture}
                        alt="profile"
                        style={{ width: "30px", height: "30px" }}
                      />
                      <CustomLink to={`/users/${user.id}`}>
                        {user.username}
                      </CustomLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div>
            {post.comment.length == 0 ? (
              <p className="mt-3">No comments</p>
            ) : (
              <p className="mt-3">
                {post.comment.length} comment{post.comment.length > 1 && "s"}
              </p>
            )}
          </div>
        </div>

        {post.comment.length != 0 && (
          <div>
            {post.comment.map((item) => (
              <CommentCard
                key={item.id}
                comment={item}
                postAuthorId={post.authorId}
              />
            ))}
          </div>
        )}

        <form action="" className="mt-3" onSubmit={(e) => handleSubmit(e)}>
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
            disabled={content.trim() === "" && !isLoading}
          >
            {isLoading ? <CustomSpinner /> : "Comment"}
          </Button>
        </form>
      </div>
    </div>
  );
}
