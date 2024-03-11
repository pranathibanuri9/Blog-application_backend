import React from "react";
import {
  CardBody,
  Card,
  Container,
  Table,
  CardFooter,
  Button,
} from "reactstrap";
import profiledefault from "../Images/profiledefault.png";
import { Link } from "react-router-dom";

function ViewUserProfile({ myuser, cuser, login }) {
  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm">
      <CardBody>
        <h3 className="text-uppercase">User Information</h3>
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
              <td>LCWD:{myuser?.id}</td>
            </tr>
            <tr>
              <td>USER NAME</td>
              <td>{myuser?.name}</td>
            </tr>
            <tr>
              <td>USER EMAIL</td>
              <td>{myuser?.email}</td>
            </tr>
            <tr>
              <td>ABOUT USER</td>
              <td>{myuser?.about}</td>
            </tr>
            <tr>
              <td>ROLES</td>
              <td>
                {myuser?.roles.map((role) => {
                  return <div key={role.id}>{role.name}</div>;
                })}
              </td>
            </tr>
          </tbody>
        </Table>
        {cuser ? (
          cuser.id == myuser.id ? (
            <CardFooter>
              <Button
                tag={Link}
                to={"/user/update-user/" + myuser?.id}
                color="warning"
                className="text-center"
              >
                Update Profile
              </Button>
            </CardFooter>
          ) : (
            " "
          )
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
}

export default ViewUserProfile;
