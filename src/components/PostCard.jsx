/* eslint-disable react/prop-types */
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons/faHeartCircleCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../assets/profilePic.jpeg";
import { useAuth } from "../hooks/useAuth";
import { checkIfLiked, dateDiff } from "../utils/function";
import { URL_API } from "../utils/url";
import CustomLink from "./CustomLink";

export default function PostCard({ post, children }) {
  const { id, token } = useAuth().user;
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [isLiked, setIsLiked] = useState(checkIfLiked(post, id));
  const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const splitContent = post.content.substring(0, 100);

  useEffect(() => {
    fetch(`${URL_API}/users/${post.authorId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, [post.authorId]);

  useEffect(() => {
    fetch(`${URL_API}/users`)
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error(error));
  }, [post.authorId]);

  const dateStr = new Date(post.createdAt).toISOString();
  const usersLiking = post.likes.map((item) => item.likerId);

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
        <p className="card-text" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? splitContent : post.content}{" "}
          {post.content.length > 100 && (
            <span
              className="text-primary"
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              {isExpanded ? "read more" : "read less"}
            </span>
          )}
        </p>

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
      </div>
      <div className="card-footer" style={{ backgroundColor: "white" }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <FontAwesomeIcon
              icon={isLiked ? faHeartCircleCheck : faHeart}
              style={{ color: isLiked ? "red" : "black" }}
              onClick={() => (token ? handleLike(post.id) : navigate("/login"))}
              size="lg"
            />{" "}
            <div className="dropdown ">
              <p
                className="dropdown ms-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                {numberOfLikes} like{numberOfLikes > 1 && "s"}
              </p>
              {numberOfLikes > 0 && (
                <ul
                  className="dropdown-menu px-2 "
                  style={{ maxHeight: "30vh", overflowY: "scroll" }}
                >
                  {userList
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
              )}
            </div>
          </div>
          <div>
            <CustomLink to={`/blogs/${post.id}`}>
              <FontAwesomeIcon icon={faComment} size="lg" />{" "}
              {post.comment.length} comment
              {post.comment.length > 1 && "s"}{" "}
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
}
