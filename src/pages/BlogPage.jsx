import { useEffect, useState } from "react";
import { URL } from "../utils/url";
import { Spinner } from "reactstrap";
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";
import { filterPost } from "../utils/function";
import CustomLink from "../components/CustomLink";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    fetch(`${URL}/blogs`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error while fetching data", error));
  }, []);

  const filteredPost = filterPost(posts, searchWord);

  return (
    <div className="container">
      <div className="row">
      <div className="col-4 mt-4">
        <SearchBar
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      <div className="col-8">
      
      {posts.length == 0 ? (
        <Spinner className="my-5" />
      ) : (
        <div >
          {filteredPost.map((post) => (
            <CustomLink key={post.id} to={`/${post.id}`}>
              <Post
                title={post.title}
                content={post.content}
                date={new Date(post.createdAt).toDateString()}
                hour={new Date(post.createdAt).toLocaleTimeString()}
              />
            </CustomLink>
          ))}
        </div>
      )}
      </div>
      </div>
    </div>
  );
}
