import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import AddPost from "../components/AddPost";
import { Container } from "reactstrap";
import { geturrentUserDetail } from "../auth";
import { loadPostByUserId ,deletePostbyId} from "../services/post-service";
import { toast } from "react-toastify";
import Post from "../components/Post";

const Userdashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    setUser(geturrentUserDetail());
    loadPostData()
    
    
  }, [])

  function loadPostData(){
    loadPostByUserId(geturrentUserDetail().id)
      .then((data) => {
        console.log(data);
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading userpost");
      })
  }
  // function to deletePost

  function deletePost(post){
    deletePostbyId(post.postId).then(res=>{
      console.log(res)
      toast.success("post deleted succesfully")
      let newPosts=posts.filter(p=>p.postId!=post.postId)
      setPosts([...newPosts])
    }).catch(error=>{
      console.log(error)
      toast.error("some error occured in deleting post")
    })
    // going to delete post

  }


  


  return (
    <Base>
      <Container>
        <AddPost></AddPost>
        <h1 className="my-3">Posts Count:({posts.length})</h1>
        {posts.map((post,index) => {
          return <Post  post={post} deletePost={deletePost}  key={index}></Post>;
        })}
      </Container>
    </Base>
  );
};

export default Userdashboard;
