/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Card, CardText } from "reactstrap";
import { dateDiff } from "../utils/function";
import { URL_API } from "../utils/url";

export default function CommentCard({ comment }) {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    fetch(`${URL_API}/users/${comment.authorId}`)
      .then((res) => res.json())
      .then((data) => setAuthor(data))
      .catch((error) => console.log(error));
  }, [comment.authorId]);

  return (
    <div>
      <Card className="py-2 px-4 mt-3 col-10 rounded-pill bg-light">
        <div className="d-flex align-items-center">
          <img
            src={author.profilPicture}
            alt="author"
            style={{ width: "30px", height: "30px" }}
            className="img-fluid rounded-circle border"
          />
          <CardText className="ms-2 fw-semibold lh-1">
            <small>{author.username}</small>
            <br />
            <small className="text-muted">
              {dateDiff(new Date(comment.createdAt).toISOString())}
            </small>
          </CardText>
        </div>
        <CardText className="fw-regular ps-3 mt-2">
          <small>{comment.content}</small>
        </CardText>
      </Card>
    </div>
  );
}
