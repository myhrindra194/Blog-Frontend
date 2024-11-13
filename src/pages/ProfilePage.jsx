import { Button, ButtonGroup, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { useAuth } from "../hooks/useAuth"
import { useEffect, useState } from "react";
import { URL } from "../utils/url";
import Post from "../components/Post";

export default function ProfilePage(){

    const { userId, token } = useAuth();
    const [post, setPost] = useState({title:"", content:""});
    const [postId, setPostId] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonState, setButtonState] = useState(false);

    const isFormValid = () => (post.title.trim() && post.content.trim());


    useEffect(() => {
        fetch(`${URL}/blogs`)
        .then(response => response.json())
        .then(data => setUserPosts(data))
        .catch(error => console.error(error))
        
    });

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${URL}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title: post.title, content: post.content})
            })
            const data = await response.json();
            console.log(data);
            
            setPost({title:"", content:""});
            setShowForm(false);

        } catch (error) {
            alert(error)
        }
   }



    const handleEdit = (title, content) => {
        setShowForm(true);
        setButtonState(true);
        setPost({title:title, content:content});
    }


    const handleDelete = (id) => {
        try {
            fetch(`${URL}/blogs/${id}`, {
                method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
            })
              
        } catch (error) {
            alert(error)
        }
        
    }


    const handleEditPost = (e) => {
        e.preventDefault()
        
        try {
            fetch(`${URL}/blogs/${postId}`, {
                method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ title: post.title, content: post.content})
            })
        } catch (error) {
            alert(error)
        }
    }

   

    return (
        <div >
            <div className="d-flex justify-content-between align-items-center">
                <p>Hello, you are connected User {userId}</p>
            </div>
            <Button className="my-5" onClick={() => setShowForm(!showForm)}> Add new post</Button>
            {
                showForm && (
                    <Form 
                        action="" 
                        onSubmit={buttonState ? (e) => handleEditPost(e) : (e) => handleSubmit(e)}
                        className="col-8 border p-5"
                    >
                        <FormGroup>                    
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                type="title"
                                autoComplete="on" 
                                value={post.title} 
                                onChange={(e) => setPost({
                                    ...post,
                                    title: e.target.value
                                })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input
                                id="content"
                                name="content"
                                type="textarea"
                                value={post.content}
                                onChange={(e) => setPost({
                                    ...post,
                                    content: e.target.value
                                })}
                            />

                        </FormGroup>
                        <Button className="mb-4 float-end"
                                disabled={!isFormValid()}
                                color="success"
                        >{(buttonState) ? "Validate": "Add"}</Button>
                        {
                            buttonState && 
                            <Button onClick={() => {
                                setPost({title:"", content:""})
                                setShowForm(false);
                                setButtonState(false);
                            }}>Cancel</Button>
                        }
                        {
                            isLoading && <Spinner />
                        }

                    </Form>
                )
            }
            {
                (userPosts.length == 0) ? 
                <div className="container"><Spinner /></div> :
                userPosts.filter(post => post.autorId == userId).map(post => (
                    <Post key={post.id} title={post.title} content={post.content}>
                        <ButtonGroup tag={"div"} className="w-25">
                            <Button color="primary" onClick={() => {
                                setPostId(post.id); 
                                handleEdit(post.title, post.content);
                            }}>Edit</Button>
                            <Button color="danger" onClick={() => handleDelete(post.id)}>Delete</Button>
                        </ButtonGroup>
                    </Post>
                ))
            }
        </div>
    )
}