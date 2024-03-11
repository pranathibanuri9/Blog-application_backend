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
import { useEffect, useRef, useState } from "react";

import JoditEditor from "jodit-react";
import { UploadpostImage, ceratePostserver } from "../services/post-service";
import { geturrentUserDetail } from "../auth/index";
import React from "react";
import { toast } from "react-toastify";

const AddPost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [image,setImage]=useState(null)

  const editor = useRef(null);

  const [categories, setCategories] = useState([]);
  
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setUser(geturrentUserDetail());

    loadAllCategories()
      .then((data) => {
        // console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // fieldchanged function

  const fieldchanged = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
    // console.log(event)
  };

  const contentFieldChanged = (dataa) => {
    setPost({ ...post, content: dataa });
  };

  const ceratePost = (event) => {
    event.preventDefault();
    // console.log("form submited");
    // console.log(post);
    if (post.title.trim() === "") {
      toast.error("post title is required !!");
      return;
    }
    if (post.content.trim() === "") {
      toast.error("post content is required !!");
      return;
    }
    if (post.categoryId === "") {
      toast.error("select some category!!");
    }
    post["userId"] = user.id;
    ceratePostserver(post)
      .then((data) => {
        UploadpostImage(image,data.postId).then(data=>{
          toast.success("Image uploadede!!")

        }).catch(error=>{
          toast.error("Error in uploadeing images")
          console.log(error)
        })
        
        toast.success("post created")
        setPost({
          title: " ",
          content: " ",
          categoryId: " "
        });
        // console.log(post);
      })
      .catch((error) => {
        toast.error("post not created due to some error")
        console.log(error);
      });

    // submit the form on server
  };

  // handlingfile change event

  const handleFileChange=(event)=>{
    console.log(event.target.files[0])
    setImage(event.target.files[0])

  }
  const handleReset=()=>{
    setPost({
      title: " ",
      content: " ",
      categoryId: " ",
    });

  }

  return (
    <div className="wrapper">
      <Card className="shadow-sm border-0 mt-2">
        <CardBody>
          <h3>whats going in your mind?</h3>
          <Form onSubmit={ceratePost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                onChange={fieldchanged}
              ></Input>
            </div>

            <div className="my-3">
              <Label for="content">Post Content</Label>

              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={contentFieldChanged}
              ></JoditEditor>
            </div>

            {/* file field */}

            <div className="mt-3">
              <Label for="image">Select post banner</Label>
              <Input id="image" type="file" onChange={handleFileChange} ></Input>
            </div>



            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here"
                className="rounded-0"
                name="categoryId"
                onChange={fieldchanged}
                defaultValue={0}
              >
                <option disabled value={0}>
                  --Select category--
                </option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>
            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="primary">
                Create Post
              </Button>
              <Button className="rounded-0 ms-2" color="danger" onClick={handleReset} type="reset">
                Reset Content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
