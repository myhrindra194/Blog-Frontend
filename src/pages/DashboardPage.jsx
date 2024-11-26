import {
  faAdd,
  faEdit,
  faEllipsis,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import CustomLink from "../components/CustomLink";
import CustomSpinner from "../components/CustomSpinner";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../hooks/useAuth";
import { filterPost, sumComment } from "../utils/function";
import { URL_API } from "../utils/url";

export default function DashBoard() {
  const { id, token } = useAuth().user;
  const [userPosts, setUserPosts] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${URL_API}/blogs`)
      .then((response) => response.json())
      .then((data) => setUserPosts(data))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch(`${URL_API}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
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
    }
  };

  const filteredPost = filterPost(userPosts, searchWord).filter(
    (post) => post.authorId == id
  );

  const commentLength = sumComment(filteredPost);

  return (
    <div className="container">
      <h3 className="mt-4 mb-md-4 mb-0">Dashboard</h3>

      <div className="row justify-content-between">
        <Card className="col-3 d-none d-md-block p-3">
          <CardTitle>Total Post</CardTitle>
          {userPosts.length == 0 ? (
            <CustomSpinner />
          ) : (
            <CardText tag={"h4"}>{filteredPost.length}</CardText>
          )}
        </Card>
        <Card className="col-3 d-none d-md-block p-3">
          <CardTitle>Total Reactions</CardTitle>
          {userPosts.length == 0 ? (
            <CustomSpinner />
          ) : (
            <CardText tag={"h4"}>{filteredPost.length}</CardText>
          )}
        </Card>
        <Card className="col-3 d-none d-md-block p-3">
          <CardTitle>Total Comments</CardTitle>
          {userPosts.length == 0 ? (
            <CustomSpinner />
          ) : (
            <CardText tag={"h4"}>{commentLength}</CardText>
          )}
        </Card>
      </div>
      <div className="row justify-content-between py-5">
        <div className="col-12 col-md-9">
          <div className="d-md-flex justify-content-between me-md-5 me-0">
            <SearchBar
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <Button color="primary" className="mt-4 mt-md-0">
              <Link
                to="/addPost"
                style={{ color: "white", textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faAdd} /> Add post
              </Link>
            </Button>
          </div>

          {userPosts.length == 0 ? (
            <CustomSpinner />
          ) : filteredPost.length == 0 ? (
            <p className="mt-5">No post </p>
          ) : (
            <div className="mt-5">
              {filteredPost.map((post) => (
                <PostCard key={post.id} post={post}>
                  {
                    <div className="dropdown ms-auto d-block d-flex justify-content-end">
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        size="xl"
                      />
                      <ul className="dropdown-menu">
                        <li className="my-2">
                          <p className="dropdown-item" type="button">
                            <Link
                              to={`/editPost/${post.id}`}
                              style={{
                                textDecoration: "none",
                                color: "#101010",
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} /> Edit post
                            </Link>
                          </p>
                        </li>
                        <li className="my-2">
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
        <div className="col-3 col-md-0 d-none d-md-block">
          <h3 className="mb-4">Friends</h3>
          <div>
            {users
              .filter((user) => user.profilPicture != null)
              .map((user) => (
                <Card key={user.id} className="mb-3">
                  <CardBody className="d-flex">
                    <div>
                      <img
                        src={user.profilPicture}
                        alt="Profile picture"
                        className="img-thumbnail-fluid rounded-circle border-dark me-2"
                        style={{ width: "30px", height: "30px" }}
                      />
                    </div>
                    <CardText>
                      <CustomLink to={`/users/${user.id}`}>
                        {user.username}
                      </CustomLink>
                    </CardText>
                  </CardBody>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
