import {
  faAdd,
  faEdit,
  faEllipsis,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  FormGroup,
  Input,
} from "reactstrap";
import CustomSpinner from "../components/CustomSpinner";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import TopUsersCard from "../components/TopUsersCard";
import { useAuth } from "../hooks/useAuth";
import { filterPost, sumComment, sumReaction } from "../utils/function";
import { URL_API } from "../utils/url";

export default function DashBoard() {
  const { id, token } = useAuth().user;
  const [posts, setPosts] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [filterKey, setFilterKey] = useState("recent");

  useEffect(() => {
    fetch(`${URL_API}/blogs`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
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

  const userPosts = posts.filter((post) => post.authorId == id);
  const filteredPost = filterPost(userPosts, filterKey, searchWord);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-4 mb-md-4 mb-0 align-items-center">
        <h3>Dashboard</h3>
        <Button color="primary">
          <Link
            to="/addPost"
            style={{ color: "white", textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faAdd} /> Add post
          </Link>
        </Button>
      </div>
      <div className="row justify-content-between">
        <Card className="col-3 d-none d-md-block p-3">
          <CardTitle>Total Post</CardTitle>
          {posts.length == 0 ? (
            <CustomSpinner />
          ) : (
            <CardText tag={"h4"}>
              {posts.filter((post) => post.authorId == id).length}
            </CardText>
          )}
        </Card>
        <Card className="col-3 d-none d-md-block p-3">
          <CardTitle>Total Reactions</CardTitle>
          {posts.length == 0 ? (
            <CustomSpinner />
          ) : (
            <CardText tag={"h4"}>{sumReaction(userPosts)}</CardText>
          )}
        </Card>
        <Card className="col-3 d-none d-md-block p-3">
          <CardTitle>Total Comments</CardTitle>
          {posts.length == 0 ? (
            <CustomSpinner />
          ) : (
            <CardText tag={"h4"}>{sumComment(userPosts)}</CardText>
          )}
        </Card>
      </div>
      <div className="row justify-content-between py-5">
        <div className="col-12 col-md-9">
          <div className="row d-flex justify-content-between">
            <div className="col-md-8 col-12">
              <SearchBar
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
              />
            </div>
            <Form className="col-md-3 col-5 mt-3 mt-md-0">
              <FormGroup>
                <Input
                  id="filterPost"
                  name="filterPost"
                  type="select"
                  value={filterKey}
                  onChange={(e) => setFilterKey(e.target.value)}
                >
                  <option value="recent">Recent date</option>
                  <option value="old">Old date</option>
                </Input>
              </FormGroup>
            </Form>
          </div>

          {posts.length == 0 ? (
            <CustomSpinner />
          ) : filteredPost.length == 0 ? (
            <p className="mt-5">No post </p>
          ) : (
            <div className="row container mt-5">
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
        <TopUsersCard />
      </div>
    </div>
  );
}
