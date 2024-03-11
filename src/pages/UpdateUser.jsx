import React, { useEffect, useState } from "react";
import { CardBody, Card, Container, Table, Input,Button,Form } from "reactstrap";
import profiledefault from "../Images/profiledefault.png";
import { useParams } from "react-router-dom";
import { getUser } from "../services/user-service";
import { toast } from "react-toastify";
import { updateUserupdate } from "../services/user-service";

function UpdateUser() {
  const { userId } = useParams();
  console.log(userId);
  // const [myuser, setMyuser] = useState(null);
  const [newuser, setNewuser] = useState(null);

  useEffect(() => {
    getUser(userId)
      .then((data) => {
        console.log(data);
        toast.success("data loaded sucessfully");
        setNewuser({ ...data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleChange = (event, fieldname) => {
    setNewuser({ ...newuser, [fieldname]: event.target.value });
    console.log(newuser);
  };

  const updateUser=(event)=>{
    event.preventDefault();
   
    updateUserupdate(newuser,userId).then((res)=>{
      console.log(res)
      toast.success("user updated successfully")
    }).catch((error)=>{
      console.log(error)
      toast.error("error occured")
    })

  }

  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm" >
      <CardBody>
        <h3 className="text-uppercase">Update User Info Here..</h3>
        <Form onSubmit={updateUser}>
        <Container className="text-center">
          <img
            src={profiledefault}
            className="img-fluid rounded-circle"
            alt="logo"
          ></img>
        </Container>
        <Table
          responsive
          striped
          hover
          className="mt-3 text-center"
          bordered={true}
        >
          <tbody>
            <tr>
              <td>USER ID</td>

              <Input
                onChange={(event) => handleChange(event, "id")}
                value={newuser?.id}
              ></Input>
            </tr>
            <tr>
              <td>USER NAME</td>

              <Input
                onChange={(event) => handleChange(event, "name")}
                value={newuser?.name}
              ></Input>
            </tr>
            <tr>
              <td>USER EMAIL</td>

              <Input
                onChange={(event) => handleChange(event, "email")}
                value={newuser?.email}
              ></Input>
            </tr>
            <tr>
              <td>ABOUT USER</td>
              <Input
                onChange={(event) => handleChange(event, "about")}
                value={newuser?.about}
              ></Input>
            </tr>
            <tr>
              <td>ROLES</td>
              <td>
                {newuser?.roles.map((role) => {
                  return (
                    <Input
                      key={role.id}
                      value={role?.name}
                      onChange={(event) => handleChange(event, "role")}
                    ></Input>
                  );
                })}
              </td>
            </tr>
            <Button
                
                color="warning"
                className=" text-center  mt-2 "
               
                
              >
               Submit
              </Button>
          </tbody>
        </Table>
        </Form>
      </CardBody>
    </Card>
  );
}

export default UpdateUser;
