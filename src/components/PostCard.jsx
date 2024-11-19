/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

export default function PostCard({ post, isExpanded, children }) {
  let splitContent = post.content.substring(0, 125);

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between">
            {post.title} {children}
          </h5>
          {post.content.length > 100 && !isExpanded ? (
            <p className="card-text">
              {splitContent}...
              <Link to={`/${post.id}`}>read more</Link>
            </p>
          ) : (
            <p>{post.content}</p>
          )}
          <p className="card-text">
            <small className="text-muted">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
              <br />
              {new Date(post.createdAt).toLocaleTimeString()}
            </small>
          </p>
          {post.image != undefined && (
            <img src={post.image} alt="image" className="img-fluid rounded" />
          )}
        </div>
      </div>
    </div>
  );
}
