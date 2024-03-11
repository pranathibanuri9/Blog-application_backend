import React, { useState } from "react";
import Base from "../components/Base";
import {
  CardHeader,
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import { toast } from "react-toastify";

import { signup } from "../services/user-service";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({ errors: {}, isError: false });

  const handleChange = (event, properties) => {
    // dynamically setting value
    setData({ ...data, [properties]: event.target.value });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };
  // submit the form
  const navigate=useNavigate()

  const submitForm = (event) => {
    event.preventDefault();
    
    // if(error.isError){
    //   toast.error("Form data invalid !!,correct all the details then submit")
    //   setError({...error,isError:false})
    //   return;
    // }
    console.log(data);
    signup(data)
      .then((response) => {
        console.log(response);
        console.log("sucess log");
        toast.success(
          " User is regestered Successfully!! with id" + response.id
        );
        navigate("/login")
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        // handle errors in proper way
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Fill Info to register!!!</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="name">Enter name</Label>
                    <Input
                      id="name"
                      placeholder="Enter here"
                      type="text"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Enter email</Label>
                    <Input
                      id="email"
                      placeholder="Enter here"
                      type="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter password</Label>

                    <Input
                      id="password"
                      placeholder="Enter here"
                      type="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">Write something</Label>
                    <Input
                      id="about"
                      placeholder="Enter here"
                      type="textarea"
                      style={{ height: "150px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button outline color="light" type="submit">
                      Register
                    </Button>
                    <Button
                      color="secondary"
                      type="reset"
                      className="ms-2"
                      onClick={resetData}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Signup;
