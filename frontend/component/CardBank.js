import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";

export const CardBank = (bank) => {
  const [detailModal, setDetailModal] = useState(false);
  const detailClose = () => setDetailModal(false);
  const detailShow = () => setDetailModal(true);
  return (
    <div style={{ width: "100%" }}>
      <Card style={{ borderRadius: "20px" }}>
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
              <Card.Text>MLR: {bank.mlr}  MOR: {bank.mor}  MRR: {bank.mrr}</Card.Text>
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
              <Card.Text>{bank.address}</Card.Text>
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
              <Button variant="light" onClick={detailShow}>ดูอัตราดอกเบี้ย</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal size="lg" id="bankdetail" show={detailModal} onHide={detailClose}  centered>
        <Modal.Header closeButton>
          <Modal.Title>อัตราดอกเบี้ย</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center" >
          <img src={bank.interest_rate} style={{ width: "100%" }}></img>
        </Modal.Body>
        <Modal.Footer>
          <Button id="close" variant="secondary" onClick={detailClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
