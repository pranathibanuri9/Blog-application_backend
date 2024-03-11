import React, { useContext, useEffect, useState, useRef } from "react";
import Base from "../components/Base";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../context/userContext";
import {
  loadPost,
  updatePost,
  updatePostupdate,
} from "../services/post-service";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";

import JoditEditor from "jodit-react";

function UpdateBlog() {
  const [categories, setCategories] = useState([]);
  const [post, SetPost] = useState(null);
  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    loadPost(blogId)
      .then((data) => {
        SetPost({ ...data, categoryId: data.category.categoryId });
        // console.log(post);
      })

      .catch((error) => {
        console.log(error);
        toast.error("error in fetching the blog");
      });
    // load the blog from data base
  }, []);
  // need to see again it is not working as of now useeffect
  useEffect(() => {
    {
      if (post) {
        if (post.user.postId != object.user.data.id) {
          navigate("/");
          toast.error("This is not yours post!!");
        }
      }
    }
  }, [post]);

  const handleChange = (event, fieldname) => {
    SetPost({
      ...post,
      [fieldname]: event.target.value,
    });
  };
  const updatePost = (event) => {
    event.preventDefault();
    // console.log(post);

    const categoryId=post?.categoryId;
    if(categoryId){
        updatePostupdate(
            { ...post, category: {categoryId}},
            post.postId
          )
            .then((res) => {
            //   console.log(res);
              toast.success("post updated");
            })
            .catch((error) => {
              console.log(error);
            });
        };

    }
//     updatePostupdate(
//       { ...post, category: {categoryId: post.categoryId}},
//       post.postId
//     )
//       .then((res) => {
//         console.log(res);
//         toast.success("post updated");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

  const updateHtml = () => {
    return (
      <div className="wrapper">
        <Card className="shadow-sm border-0 mt-2">
          <CardBody>
            <h3>update post from here</h3>
            <Form onSubmit={updatePost}>
              <div className="my-3">
                <Label for="title">Post Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="title"
                  value={post.title}
                  onChange={(event) => handleChange(event, "title")}
                ></Input>
              </div>

              <div className="my-3">
                <Label for="content">Post Content</Label>

                <JoditEditor
                  //   ref={editor}
                  value={post.content}
                  onChange={(newContent) =>
                    SetPost({ ...post, content: newContent })
                  }
                ></JoditEditor>
              </div>

              {/* file field */}

              <div className="mt-3">
                <Label for="image">Select post banner</Label>
                <Input id="image" type="file" onChange={""}></Input>
              </div>

              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="category"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="categoryId"
                  onChange={(event) => {
                    handleChange(event, "categoryId");
                  }}
                  value={post.categoryId}
                >
                  <option disabled value={0}>
                    --Select category--
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryTitle}
                    </option>
                  ))}
                </Input>
              </div>
              <Container className="text-center">
                <Button type="submit" className="rounded-0" color="primary">
                  UpdatePost Post
                </Button>
                <Button className="rounded-0 ms-2" color="danger">
                  Reset Content
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };
  return (
    <Base>
      <Container>{post && updateHtml()}</Container>
    </Base>
  );
}

export default UpdateBlog;
