import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Input,
  Button,
} from "reactstrap";
import { useEffect, useState } from "react";
import { createComment, loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../auth";

const PostPage = () => {
  const [post, setPost] = useState(null);

  const { postId } = useParams();
  const [comment, setComment] = useState({
    content: "",
  });

  useEffect(() => {
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error occured");
      });
  }, []);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleString();
  };

  const submitComment = () => {
    if(!isLoggedIn()){
      toast.error("Need to login First!!")
      return

    }
    if (comment.content.trim()==' '){
      return
    }

    createComment(comment, post.postId)
      .then((data) => {
        console.log(data);
        toast.success("comment successfully added");
        setPost({
          ...post,
          comments: [...post.comments, data.data]
        });
        setComment({
          content:' '
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home </Link>/{post && <Link to="">{post.title}</Link>}
        <Row>
          <Col onMouseDown={{ size: 12 }}>
            {post && (
              <Card className="mt-3 ps-2 border-0 shadow-sm">
                <CardBody>
                  <CardText>
                    {" "}
                    Posted By <b>{post.user?.name}</b> on{" "}
                    <b>{printDate(post.addedDate)}</b>
                    <CardText className="mt-3">
                      <h1>{post.title}</h1>
                    </CardText>
                    <CardText>
                      <span className="text-muted">
                        {post.category.categoryTitle}
                      </span>
                    </CardText>
                    <div
                      className="divder"
                      style={{
                        width: "100%",
                        height: "1px",
                        background: "#e2e2e2",
                      }}
                    ></div>
                    <div
                      className="image-container mt=5 shadow "
                      style={{ maxwidth: "100%" }}
                    >
                      <img
                        className="img-fluid"
                        src={BASE_URL + "/post/image/" + post.imageName}
                        alt=""
                      ></img>
                    </div>
                  </CardText>
                  <CardText
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
        <Row className="my-4">
          <Col md={{ size: 9, offset: 1 }}>
            <h3>Comments({post ? post.comments.length : "0"})</h3>
            {post &&
              post.comments.map((c, index) => (
                <Card className="mt-2 border-0" key={index}>
                  <CardBody>
                    <CardText>{c.content}</CardText>
                  </CardBody>
                </Card>
              ))}

            <Card className="mt-4 border-0">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="Enter comments Here"
                  onChange={(event) =>
                    setComment({ content: event.target.value })
                  }
                  value={comment.content}
                ></Input>
                <Button
                  onClick={submitComment}
                  className="mt-2"
                  color="primary"
                >
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};
export default PostPage;
