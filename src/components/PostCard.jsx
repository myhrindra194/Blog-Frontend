/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../utils/url";
import profilePic from "../assets/profilePic.jpeg";

export default function PostCard({ post, isExpanded, children }) {
  const [user, setUser] = useState([]);
  let splitContent = post.content.substring(0, 125);

  useEffect(() => {
    fetch(`${URL}/users/${post.autorId}`)
      .then((response) => response.json())
      .then((data) => setUser(data[0]))
      .catch((error) => console.error(error));
  }, [post.autorId]);

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <img
              src={user.profilPicture == null ? profilePic : user.profilPicture}
              alt="Profile picture"
              className="img-thumbnail-fluid rounded-circle border-dark me-2"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div>
              <small>{user.username}</small>
              <small className="text-muted">
                <br />
                Posted on {new Date(post.createdAt).toLocaleDateString()}
                {" - "}
                {new Date(post.createdAt).toLocaleTimeString()}
              </small>
            </div>

            {children}
          </div>
          <h5 className="card-title d-flex justify-content-between mt-4">
            {post.title}
          </h5>
          {post.content.length > 100 && !isExpanded ? (
            <p className="card-text">
              {splitContent}...
              <Link to={`/${post.id}`}>read more</Link>
            </p>
          ) : (
            <p>{post.content}</p>
          )}

          {post.image != undefined && (
            <img src={post.image} alt="image" className="img-fluid rounded" />
          )}
        </div>
      </div>
    </div>
  );
}
