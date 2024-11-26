/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, ButtonGroup, Card, CardText, Input } from "reactstrap";
import profilePic from "../assets/profilePic.jpeg";
import { useAuth } from "../hooks/useAuth";
import { dateDiff } from "../utils/function";
import { URL_API } from "../utils/url";
import CustomSpinner from "./CustomSpinner";

export default function CommentCard({ comment }) {
  const { id, token } = useAuth().user;
  const [author, setAuthor] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch(`${URL_API}/users/${comment.authorId}`)
      .then((res) => res.json())
      .then((data) => setAuthor(data))
      .catch((error) => console.log(error));
  }, [comment.authorId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete")) {
      try {
        const response = await fetch(
          `${URL_API}${location.pathname}/comments/${comment.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data.message);
        window.location.reload();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleModify = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${URL_API}${location.pathname}/comments/${comment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: content }),
        }
      );
      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
    setIsEditing(false);
  };

  return (
    <div className="w-100">
      <Card className="py-2 px-4 my-3 col-12  rounded-5 bg-light">
        <div className="d-flex align-items-center">
          <img
            src={author.profilPicture ? author.profilPicture : profilePic}
            alt="author"
            style={{ width: "40px", height: "40px" }}
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
        {isEditing ? (
          <form action="" className="p-2">
            <Input
              type="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {isLoading ? (
              <CustomSpinner />
            ) : (
              <ButtonGroup className="mt-2">
                {" "}
                <Button color="danger" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button color="success" onClick={() => handleModify()}>
                  Validate
                </Button>
              </ButtonGroup>
            )}
          </form>
        ) : (
          <CardText className="fw-regular ps-3 mt-2 ms-4">
            {comment.content}
          </CardText>
        )}
      </Card>

      {comment.authorId === id && (
        <div className="text-muted d-flex justify-content-end me-3 mt-2">
          {" "}
          <small
            onClick={() => setIsEditing(true)}
            style={{ cursor: "pointer" }}
          >
            Modify
          </small>{" "}
          {"| "}
          <small onClick={handleDelete} style={{ cursor: "pointer" }}>
            Delete
          </small>
        </div>
      )}
    </div>
  );
}
