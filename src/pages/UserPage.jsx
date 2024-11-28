import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import profilePic from "../assets/profilePic.jpeg";
import CustomLink from "../components/CustomLink";
import PostCard from "../components/PostCard";
import { useAuth } from "../hooks/useAuth";
import { filterPost } from "../utils/function";
import { URL_API } from "../utils/url";

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

  const userPosts = filterPost(posts).filter((post) => post.authorId == idUser);

  return (
    <div className="container">
      <div className="border p-5 mt-5 userBg">
        <div className="d-md-flex align-items-center">
          <div>
            <img
              src={user?.profilPicture ? user?.profilPicture : profilePic}
              alt="profile"
              className="img-thumbnail-fluid rounded-circle border shadow"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <div className="ms-md-4 mt-md-5 pt-4">
            <h4 className="mt-3">{user?.username}</h4>
            <small className="text-muted">{user?.email}</small>
            <p>
              {user?.gender === "M" && "Male"}
              {user?.gender === "F" && "Female"}
              {user?.gender === "O" ||
                (user?.gender === null && "Gender not defined")}
            </p>
          </div>
        </div>

        {idUser == id && (
          <Button color="light" className="ms-auto d-block mt-2 mt-md-0">
            <CustomLink to={`/editProfile`}>Edit profile</CustomLink>
          </Button>
        )}
      </div>
      <div className="row my-5">
        <div className="col-12 col-md-7">
          <Card className="py-3 ps-3 mb-4">
            <h4>Biography</h4>
            <p className="mt-3">{user?.bio ? user?.bio : "No description"}</p>
          </Card>

          <Card className="py-3 ps-3 mb-4">
            <h4>All posts ({userPosts.length})</h4>
          </Card>
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="col-5 col-0-md d-none d-md-block">
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
