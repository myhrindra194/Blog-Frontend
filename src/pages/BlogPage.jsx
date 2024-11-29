import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSpinner from "../components/CustomSpinner";
import PostCard from "../components/PostCard";
import ProfilCard from "../components/ProfilCard";
import SearchBar from "../components/SearchBar";
import { filterPost } from "../utils/function";
import { URL_API } from "../utils/url";

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
        <div className="col-12 col-md-3 left">
          <SearchBar
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
        <div className="col-md-6 col-sm-12 mt-3 mt-md-0">
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
                  isExpanded={false}
                  onClick={() => navigate(`/${post.id}`)}
                />
              ))}
            </>
          )}
        </div>
        <div className="col-3 d-none d-md-block right">
          <h4 className="mb-4">Top users</h4>
          <div>
            {users
              .filter((user) => user.profilPicture != null)
              .map((user) => (
                <ProfilCard key={user.id} user={user} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
