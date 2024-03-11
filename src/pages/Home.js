import React, { useEffect } from "react";
import Base from "../components/Base";
import CustomNavbar from "../components/CustomNavbar";
import Newfeed from "../components/Newfeed";
import { Container, Row, Col } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";

function Home() {
  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-5">
            <CategorySideMenu></CategorySideMenu>
          </Col>
          <Col md={10}>
            <Newfeed></Newfeed>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Home;
