import { useEffect, useState } from "react";
import { URL } from "../utils/url";
import { Spinner} from "reactstrap";
import { Link } from "react-router-dom";
import Post from "../components/Post";

export default function BlogPage(){
    const [posts, setPosts] = useState([]);
    

    useEffect(() => {
        fetch(`${URL}/blogs`)
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(error => {
            console.error("Error while fetching data", error)
        })
    }, []);


    return(
        <div className="container py-5">
            {
                (posts.length == 0) ? <Spinner/>:   
                (
                    <>
                    {
                        posts.map(post => (
                            <Link key={post.id} to={`/${post.id}`}>
                                <Post
                                    title={post.title}
                                    content={post.content}
                                />
                            </Link>
                        ))
                    }
                    </>
                )
            }
        </div>
    )
}