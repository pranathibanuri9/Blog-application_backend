import React, { useContext, useEffect, useState } from "react";
import { CardBody, Card, CardText, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { geturrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

const Post = ({
  post = {
    id: -1,
    title: "this is default post title",
    content: "this is default post content",
  },deletePost
}) => {
  const userContextData=useContext(userContext)
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setUser(geturrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  return (
    <Card className="border-0 shadow-sm mb-3 mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText
          dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) +"..."}}
        ></CardText>
        <div>
          <Link
            className="btn btn-secondary border-0"
            to={"/posts/" + post.postId}
          >
            Read More
          </Link>

          {login &&
            (user && user.id === post.user.id ? (
              <Button onClick={()=>deletePost(post)} color="danger" className="ms-2">
                Delete
              </Button>
            ) : (
              " "
            ))}
            {login &&
            (user && user.id === post.user.id ? (
              <Button tag={Link} to={"/user/update-blog/"+post.postId} color="warning" className="ms-2">
                Update
              </Button>
            ) : (
              " "
            ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
