import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Card, Button, Row, Col } from "react-bootstrap";

export const BankDetail = ( rate ) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Row style={{ padding: "20px 0px" }}>
        <Col>
          <Button variant="light">ย้อนกลับ</Button>
        </Col>
      </Row>
      <Row style={{ display: "flex", justifyContent: "center", marginLeft: "20px" }}>
        <img src="https://refinn-blog.s3.ap-southeast-1.amazonaws.com/images/blog/_content/T2qCfYN2JORgHvBs.png"></img>
      </Row>
    </div>
  );
};
