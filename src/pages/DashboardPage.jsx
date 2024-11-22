import { faEdit, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { URL_API } from "../utils/url";
import PostCard from "../components/PostCard";
import { filterPost } from "../utils/function";
import SearchBar from "../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSpinner from "../components/CustomSpinner";
import { Link } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import CustomLink from "../components/CustomLink";

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
    (post) => post.autorId == id
  );

  return (
    <div className="container">
      <h3 className="my-4">Dashboard</h3>

      <div className="row justify-content-between">
        <Card className="col-4 p-4">
          <CardTitle>Total Post</CardTitle>
          {filteredPost.length == 0 ? (
            <CustomSpinner />
          ) : (
            <CardText tag={"h4"}>{filteredPost.length}</CardText>
          )}
        </Card>
        <Card className="col-4 p-4">
          <CardTitle>Total Reactions</CardTitle>
          {filteredPost.length == 0 ? (
            <CustomSpinner />
          ) : (
            <CardText tag={"h4"}>{filteredPost.length}</CardText>
          )}
        </Card>
        <Card className="col-3 p-4">
          <CardTitle>Total Comments</CardTitle>
          {filteredPost.length == 0 ? (
            <CustomSpinner />
          ) : (
            <CardText tag={"h4"}>{filteredPost.length}</CardText>
          )}
        </Card>
      </div>
      <div className="row justify-content-between py-5">
        <div className="row col-8">
          <div className="col-8">
            <SearchBar
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
          </div>

          {userPosts.length == 0 ? (
            <CustomSpinner />
          ) : filteredPost.length == 0 ? (
            <p className="mt-5">No item </p>
          ) : (
            <div className="mt-5">
              {filteredPost.map((post) => (
                <PostCard key={post.id} post={post}>
                  {
                    <div className="dropdown col-8 d-flex justify-content-end">
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
        <div className="col-3">
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
