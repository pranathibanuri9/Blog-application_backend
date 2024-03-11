import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { loadAllPosts } from "../services/post-service";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroller";
import { deletePostbyId } from "../services/post-service";
function Newfeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: " ",
    totalElements: " ",
    pageSize: " ",

    pageNumber: " ",

    lastPage: false,
  });

  // const [currentPage, SetCurrentPage] = useState(0);

  useEffect(() => {
    changePage(0);
  }, []);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }
    
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent(data);
        // setPostContent({
        //   content: [...postContent.content, ...data.content],
        //   totalPages: data.totalPages,
        //   totalElements: data.totalElements,
        //   pageSize: data.pageSize,

        //   pageNumber: data.pageNumber,

        //   lastPage: data.lastPage,
        // });
        console.log(data);
        window.scroll(0, 0);
      })
      .catch((error) => {
        toast.error("Error in loading post");
      });
  };

  // const changePageInfinite = () => {
  //   console.log("page changes");

  //   SetCurrentPage(currentPage + 1);
  // };

  // const changePageInfinite=useCallback(()=>{

  //   // console.log("pagechanges")
  //   SetCurrentPage((changePage)=>changePage+1);

  // },[SetCurrentPage])
  // useEffect(()=>{changePage(0),[]});
  function deletePost(post){
    deletePostbyId(post.postId).then(res=>{
      console.log(res)
      toast.success("post deleted succesfully")
      let newpostcontents=postContent.content.filter(p=>p.postId!=post.postId)
      setPostContent({...postContent,content:newpostcontents})
     
    }).catch(error=>{
      console.log(error)
      toast.error("some error occured in deleting post")
    })
    // going to delete post

  }


  return (
    <div>
      <div className="container-fluid">
        <Row>
          <Col md={{ size: 12}}>
            <h2> Blogs Count ({postContent?.totalElements})</h2>
            {/*<InfiniteScroll
              dataLength={postContent.content.length}
              //  next={changePageInfinite}
               loadMore={changePageInfinite}
              hasMore={!postContent.lastPage}
            >
              {postContent.content.map((post) => (
                <Post post={post} key={post.postid}></Post>
              ))}
              </InfiniteScroll>*/}

            {postContent.content.map((post) => (
              <Post post={post} deletePost={deletePost} key={post.postid} ></Post>
            ))}

            <Container className=" mt-2">
              <Pagination size="lg">
                <PaginationItem
                  onClick={() => changePage(postContent.pageNumber - 1)}
                  disabled={postContent.pageNumber === 0}
                >
                  <PaginationLink previous>Previous</PaginationLink>
                </PaginationItem>
                {[...Array(postContent.totalPages)].map((item, index) => (
                  <PaginationItem
                    onClick={() => changePage(index)}
                    key={index}
                    active={index === postContent.pageNumber}
                  >
                    <PaginationLink>{index + 1}</PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem
                  onClick={() => changePage(postContent.pageNumber + 1)}
                  disabled={postContent.lastPage}
                >
                  <PaginationLink next>Next</PaginationLink>
                </PaginationItem>
              </Pagination>
            </Container>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Newfeed;
