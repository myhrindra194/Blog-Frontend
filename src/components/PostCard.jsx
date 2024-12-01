/* eslint-disable react/prop-types */

import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons/faHeartCircleCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import profilePic from "../assets/profilePic.jpeg";
import { useAuth } from "../hooks/useAuth";
import { checkIfLiked, dateDiff } from "../utils/function";
import { URL_API } from "../utils/url";
import CustomLink from "./CustomLink";

export default function PostCard({ post, children }) {
  const { id, token } = useAuth().user;
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(checkIfLiked(post, id));
  const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);
  const navigate = useNavigate();
  let splitContent = post.content.substring(0, 125);

  useEffect(() => {
    fetch(`${URL_API}/users/${post.authorId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, [post.authorId]);

  const dateStr = new Date(post.createdAt).toISOString();

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

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <img
            src={user?.profilPicture == null ? profilePic : user?.profilPicture}
            alt="Profile picture"
            className="img-thumbnail-fluid rounded-circle border-dark me-2"
            style={{ width: "50px", height: "50px" }}
          />
          <div>
            <small>
              <CustomLink to={`/users/${user?.id}`}>
                {user?.username}
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
        {post.content.length > 100 ? (
          <p className="card-text">
            {splitContent}...
            <Link to={`/blogs/${post.id}`}>read more</Link>
          </p>
        ) : (
          <p>{post.content}</p>
        )}

        {post.image != undefined && (
          <Link to={`/blogs/${post.id}`}>
            <img
              src={post.image}
              alt="image"
              className="img-fluid rounded imgPost"
              style={{
                height: "350px",
                width: "100%",
              }}
            />
          </Link>
        )}
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <FontAwesomeIcon
              icon={isLiked ? faHeartCircleCheck : faHeart}
              style={{ color: isLiked ? "red" : "black" }}
              onClick={() => (token ? handleLike(post.id) : navigate("/login"))}
              size="lg"
            />{" "}
            <CustomLink to={`/blogs/${post.id}`}>
              {numberOfLikes} like{numberOfLikes > 1 && "s"}
            </CustomLink>
          </div>
          <Button color="light" outline>
            <CustomLink to={`/blogs/${post.id}`}>
              <FontAwesomeIcon icon={faComment} size="lg" />{" "}
              {post.comment.length} comment
              {post.comment.length > 1 && "s"}{" "}
            </CustomLink>
          </Button>
        </div>
        <hr />
      </div>
    </div>
  );
}
