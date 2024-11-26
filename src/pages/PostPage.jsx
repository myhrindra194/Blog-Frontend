import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomSpinner from "../components/CustomSpinner";
import DetailedPost from "../components/DetailedPost";
import { URL_API } from "../utils/url";

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
    <div className="container mt-5 col-12 col-md-8">
      {post.length == 0 ? <CustomSpinner /> : <DetailedPost post={post} />}
    </div>
  );
}
