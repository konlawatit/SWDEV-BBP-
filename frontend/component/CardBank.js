import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Card, Button, Row, Col } from "react-bootstrap";


export const CardBank = (bank) => {
    // console.log(bank);
  return (
    <div style={{ width: "100%",  }}>
      <Card style={{ borderRadius: '20px' }}>
        <Card.Body>
          <Row>
            <Col md="auto">
              <Card.Title>{bank.name}</Card.Title>
            </Col>
            <Col md="auto">
              <div
                style={{
                  backgroundColor: "#C4AEFF",
                  borderRadius: "50px",
                  padding: "2px 10px",
                }}
              >
                Good Bank
              </div>
            </Col>
          </Row>
          <Row>
            <Card.Text>{bank.title}</Card.Text>
          </Row>
          <Row>
            <Col>
              <Card.Text>Gst : {bank.gst}</Card.Text>
            </Col>
            <Col md="auto"></Col>
            <Col
              xs
              lg="5"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Card.Text>Phone No : {bank.phone}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>
                {bank.address}
              </Card.Text>
            </Col>
            <Col md="auto"></Col>
            <Col
              xs
              lg="4"
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="light">

                ดูอัตราดอกเบี้ย
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
