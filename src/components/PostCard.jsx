/* eslint-disable react/prop-types */

import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import profilePic from "../assets/profilePic.jpeg";
import { dateDiff } from "../utils/function";
import { URL_API } from "../utils/url";
import CustomLink from "./CustomLink";

export default function PostCard({ post, children }) {
  const [user, setUser] = useState([]);
  let splitContent = post.content.substring(0, 125);

  useEffect(() => {
    fetch(`${URL_API}/users/${post.authorId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, [post.authorId]);

  const dateStr = new Date(post.createdAt).toISOString();

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-center">
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
        <div className="text-end">
          <hr />
          <Button color="light" outline>
            <CustomLink to={`/blogs/${post.id}`}>
              <FontAwesomeIcon icon={faComment} /> Comment
            </CustomLink>
          </Button>
          <hr />
        </div>
      </div>
    </div>
  );
}
