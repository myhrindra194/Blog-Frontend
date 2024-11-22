import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_API } from "../utils/url";
import profilePic from "../assets/profilePic.jpeg";
import PostCard from "../components/PostCard";
import { filterPost } from "../utils/function";
import { useAuth } from "../hooks/useAuth";
import CustomLink from "../components/CustomLink";
import { Button } from "reactstrap";

export default function UserPage() {
  const { idUser } = useParams();
  const { id } = useAuth().user;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${URL_API}/blogs`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error while fetching data", error));
  }, []);

  useEffect(() => {
    fetch(`${URL_API}/users/${idUser}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error while fetching data", error));
  }, [idUser]);

  const userPosts = filterPost(posts).filter((post) => post.autorId == idUser);

  return (
    <div className="container">
      <div className=" mt-5 border p-5">
        <img
          src={user?.profilPicture ? user?.profilPicture : profilePic}
          alt="profile"
          className="img-thumbnail-fluid rounded-circle border"
          style={{ width: "180px", height: "180px" }}
        />
        <h4 className="ms-5 mt-3">{user?.username}</h4>
        {idUser == id && (
          <Button color="primary" className="ms-auto d-block">
            <CustomLink to={`/editProfile`}>Edit profile</CustomLink>
          </Button>
        )}
      </div>
      <div className="my-5">
        <h4 className="mb-3">All posts ({userPosts.length})</h4>
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
