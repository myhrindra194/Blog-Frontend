import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../utils/url";
import profilePicture from "../assets/profilePic.jpeg";
import PostCard from "../components/PostCard";
import { filterPost } from "../utils/function";

export default function UserPage() {
  const { idUser } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${URL}/users/${idUser}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error while fetching data", error));
  }, [idUser]);

  useEffect(() => {
    fetch(`${URL}/blogs`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error while fetching data", error));
  }, []);

  const userPosts = filterPost(posts).filter((post) => post.autorId == idUser);

  return (
    <div className="container">
      <div className=" mt-5 border p-5">
          <img
            src={user.profilPicture ? user.profilPicture : profilePicture}
            alt="profile"
            className="img-thumbnail-fluid rounded-circle border"
            style={{ width: "180px", height: "180px" }}
          />
          <h4 className="ms-5 mt-3">{user.username}</h4>
      </div>
      <div className="my-5">
        <h4 className="mb-3">All posts</h4>
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
