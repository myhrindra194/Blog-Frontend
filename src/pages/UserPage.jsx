import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_API } from "../utils/url";
import profilePic from "../assets/profilePic.jpeg";
import PostCard from "../components/PostCard";
import { filterPost } from "../utils/function";
import { useAuth } from "../hooks/useAuth";
import CustomLink from "../components/CustomLink";
import { Button, Card, CardBody, CardText } from "reactstrap";

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
      <div className="border p-5 mt-5 userBg">
        <div className="d-flex align-items-center">
          <div>
            <img
              src={user?.profilPicture ? user?.profilPicture : profilePic}
              alt="profile"
              className="img-thumbnail-fluid rounded-circle border shadow"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <div className="ms-4 mt-5 pt-4">
            <h4 className="mt-3">{user?.username}</h4>
            <small className="text-muted">{user?.email}</small>
          </div>
        </div>

        {idUser == id && (
          <Button color="light" className="ms-auto d-block">
            <CustomLink to={`/editProfile`}>Edit profile</CustomLink>
          </Button>
        )}
      </div>
      <div className="row my-5">
        <div className="col-7">
          <Card className="py-3 ps-3 mb-4">
            <h4>All posts ({userPosts.length})</h4>
          </Card>
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="col-5">
          <Card className="px-2 py-4">
            <CardText tag={"h5"} className="mb-2 ms-3">
              Images
            </CardText>
            <CardBody className="d-flex gap-2">
              {userPosts.length == 0 ? (
                <p>No image found</p>
              ) : (
                userPosts
                  .filter((post) => post.image != null)
                  .map((post) => (
                    <Card
                      key={post.id}
                      to={`/blogs/${post.id}`}
                      style={{
                        height: "120px",
                        width: "120px",
                        backgroundImage: `url(${post.image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    ></Card>
                  ))
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
