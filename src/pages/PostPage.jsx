import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_API } from "../utils/url";
import PostCard from "../components/PostCard";
import CustomSpinner from "../components/CustomSpinner";

export default function PostPage() {
  const { idPost } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch(`${URL_API}/blogs/${idPost}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error while fetching data", error));
  }, [idPost]);

  return (
    <div className="container mt-5">
      {post.length == 0 ? (
        <CustomSpinner />
      ) : (
        <PostCard
          post={post}
          isExpanded={true}
        />
      )}
    </div>
  );
}
