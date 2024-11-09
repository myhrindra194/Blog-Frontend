import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../utils/url";
import Post from "../components/Post";
import { Spinner } from "reactstrap";


export default function PostPage(){
    const {idPost} = useParams();
    const [post, setPost] = useState([]);
    
    useEffect(() => {
        fetch(`${URL}/${idPost}`)
        .then(res => res.json())
        .then(data => setPost(data))
        .catch(error => {
            console.error("Error while fetching data", error)
        })
    }, [idPost]);

    return (post == []) ?
        <Spinner /> : 
        <Post 
            userId={post.userId}
            title={post.title}
            body={post.body}
        />
} 