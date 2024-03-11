import React, { useContext, useEffect, useState } from "react";
import Base from "../components/Base";

import { geturrentUserDetail, isLoggedIn } from "../auth";
import { useParams } from "react-router-dom";
import { getUser } from "../services/user-service";
import { toast } from "react-toastify";
import { Form, Row, Col, CardBody, Card, Container, Table } from "reactstrap";
import ViewUserProfile from "../components/ViewUserProfile";


export default function Profile() {
  const [prouser, setProuser] = useState(null);
  const[prologin,setPrologin]=useState(false)
  const [myuser, setMyuser] = useState(null);
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    setProuser(geturrentUserDetail());
    setPrologin(isLoggedIn())
    getUser(userId)
      .then((data) => {
        console.log(data);

        setMyuser({ ...data });
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in fetching the data");
      });
  }, []);
  console.log(myuser);

  const userView = () => {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <ViewUserProfile myuser={myuser} cuser={prouser} login={prologin}></ViewUserProfile>
          
        </Col>
      </Row>
    );
  };

  return <Base>{myuser ? userView() : "Loading user data..."}</Base>;
}
