import { faEdit, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { URL_API } from "../utils/url";
import PostCard from "../components/PostCard";
import { filterPost } from "../utils/function";
import SearchBar from "../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSpinner from "../components/CustomSpinner";
import { Link } from "react-router-dom";

export default function DashBoard() {
  const { id, token } = useAuth().user;
  const [userPosts, setUserPosts] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    fetch(`${URL_API}/blogs`)
      .then((response) => response.json())
      .then((data) => setUserPosts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      try {
        const response = await fetch(`${URL_API}/blogs/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        alert(error);
      }
    }
  };

  const filteredPost = filterPost(userPosts, searchWord).filter(
    (post) => post.autorId == id
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8 p-4 offset-lg-2 offset-md-3">
          <div className="container">
            <SearchBar
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <h3 className="my-4">My Blog</h3>
            {userPosts.length == 0 ? (
              <CustomSpinner />
            ) : filteredPost.length == 0 ? (
              <p className="mt-5">No item </p>
            ) : (
              <div className="mt-5">
                {filteredPost.map((post) => (
                  <PostCard key={post.id} post={post}>
                    {
                      <div className="dropdown col-8 d-flex justify-content-end">
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          size="xl"
                        />
                        <ul className="dropdown-menu">
                          <li>
                            <p className="dropdown-item" type="button">
                              <Link
                                to={`/editPost/${post.id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#101010",
                                }}
                              >
                                <FontAwesomeIcon icon={faEdit} /> Edit post
                              </Link>
                            </p>
                          </li>
                          <li>
                            <p
                              className="dropdown-item"
                              type="button"
                              onClick={() => handleDelete(post.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </p>
                          </li>
                        </ul>
                      </div>
                    }
                  </PostCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
