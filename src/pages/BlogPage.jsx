import { useEffect, useState } from "react";
import { URL } from "../utils/url";
import { Spinner, Button, Nav, ButtonGroup } from "reactstrap";
import { Link } from "react-router-dom";

export default function BlogPage(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(URL)
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(error => {
            console.error("Error while fetching data", error)
        })
    }, []);


    return(
        <div className="container py-5">
            <Nav className="py-3 d-flex justify-content-between">
                <h3>My posts</h3>
                <ButtonGroup>
                    <Button><Link to="/login">Login</Link></Button>
                    <Button outline><Link to="/register">Register</Link></Button>
                </ButtonGroup>
            </Nav>
            {
                (posts.length == 0) ? <Spinner/>:   
                (
                    <ul>
                    {
                        posts.map(post => (
                            <li key={post.id}>{post.title} {post.content}</li>
                        ))
                    }
                    </ul>
                )
            }

        </div>
    )
}