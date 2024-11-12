import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { useAuth } from "../hooks/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { URL } from "../utils/url";

export default function ProfilePage(){
    const { token, logout } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [post, setPost] = useState({
        title:"",
        content:""
    })
    const [isLoading, setIsLoading] = useState(false);

   
   const handleLogout = () => {
        logout();
   }

   const isFormValid = () => {
        return(post.title.trim() && post.content.trim());
   }

   const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = fetch(`${URL}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title: post.title, content: post.content})
            })
            
            const data = (await response).json();
            console.log(data);
            setShowForm(false);
            
        } catch (error) {
            alert(error)
        }
   }

    return (
        <div >
            <div className="d-flex justify-content-between align-items-center">
                <p>Hello, you are connected</p>
                <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} size="xl"/>
            </div>
            <Button className="my-5" onClick={() => setShowForm(true)}> Add new post</Button>
            
            {
                showForm && (
                    <Form action="" onSubmit={(e) => {handleSubmit(e)}} className="col-8 border p-5">
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
                        >Add</Button>
                        {
                            isLoading && <Spinner />
                        }
                    </Form>
                )
            }
        </div>
    )
}