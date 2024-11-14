import { useEffect, useState } from "react";
import { URL } from "../utils/url";
import { Spinner} from "reactstrap";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";
import { filterPost } from "../utils/function";

export default function BlogPage(){
    const [posts, setPosts] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        fetch(`${URL}/blogs`)
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(error => {
            console.error("Error while fetching data", error)
        })
    }, []);


    return(
        <div className="container py-4">
           <SearchBar value={searchWord} onChange={(e) => setSearchWord(e.target.value)}/>
            {
                (posts.length == 0) ? <Spinner/>:   
                (
                    <>
                    {
                        filterPost(posts, searchWord).map(post => (
                            <Link key={post.id} to={`/${post.id}`}>
                                <Post
                                    title={post.title}
                                    content={post.content}
                                    date={new Date(post.createdAt).toDateString() +" at "+ new Date(post.createdAt).toLocaleTimeString()}
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