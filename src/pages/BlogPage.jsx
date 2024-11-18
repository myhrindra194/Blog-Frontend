import { useEffect, useState } from "react";
import { URL } from "../utils/url";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import { filterPost } from "../utils/function";
import CustomSpinner from "../components/CustomSpinner";
import { useNavigate } from "react-router-dom";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${URL}/blogs`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error while fetching data", error));
  }, []);

  const filteredPost = filterPost(posts, searchWord);

  return (
    <div className="container">
      <div className="mt-4">
        <SearchBar
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      {posts.length == 0 ? (
        <CustomSpinner />
      ) : filteredPost.length == 0 ? (
        <p>No item</p>
      ) : (
        <div className="row gap-4">
          {filteredPost.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              date={new Date(post.createdAt).toDateString()}
              hour={new Date(post.createdAt).toLocaleTimeString()}
              image={post.image}
              onClick={() => navigate(`/${post.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
