import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../utils/url";
import PostCard from "../components/PostCard";
import CustomSpinner from "../components/CustomSpinner";

export default function PostPage() {
  const { idPost } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch(`${URL}/blogs/${idPost}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error while fetching data", error));
  }, [idPost]);

  return (
    <div className="container row">
      {post.length == 0 ? (
        <CustomSpinner />
      ) : (
        <PostCard
          title={post.title}
          content={post.content}
          date={new Date(post.createdAt).toDateString()}
          hour={new Date(post.createdAt).toLocaleTimeString()}
        />
      )}
    </div>
  );
}
