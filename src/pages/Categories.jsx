import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import Newfeed from "../components/Newfeed";
import { Row, Col, Container } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import { loadPostCategorywise } from "../services/post-service";
import { toast } from "react-toastify";
import Post from "../components/Post";
import { deletePostbyId } from "../services/post-service";

function Categories() {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(categoryId);
    loadPostCategorywise(categoryId)
      .then((data) => {
        console.log(data);
        setPosts([...data.content]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading post by category");
      });
  },[categoryId]);

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
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-5">
            <CategorySideMenu></CategorySideMenu>
          </Col>
          <Col md={10}>
            <h2>Blogs Count( {posts.length})</h2>
            {posts &&
              posts.map((posti) => {
                return <Post post={posti} deletePost={deletePost}></Post>;
              })}
              {posts.length<=0?<h1>No posts in this category</h1>:""}



          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
