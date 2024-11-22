import { useEffect, useState } from "react";
import { URL_API } from "../utils/url";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import { filterPost } from "../utils/function";
import CustomSpinner from "../components/CustomSpinner";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardText } from "reactstrap";
import CustomLink from "../components/CustomLink";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${URL_API}/blogs`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error while fetching data", error));
  }, []);

  useEffect(() => {
    fetch(`${URL_API}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error while fetching data", error));
  }, []);

  const filteredPost = filterPost(posts, searchWord);

  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-md-3">
          <SearchBar
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
        <div className="col-md-6 col-10">
          {posts.length == 0 ? (
            <CustomSpinner />
          ) : filteredPost.length == 0 ? (
            <p>No item</p>
          ) : (
            <>
              {filteredPost.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/${post.id}`)}
                />
              ))}
            </>
          )}
        </div>
        <div className="col-3">
          <h4 className="mb-4">Top users</h4>
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
