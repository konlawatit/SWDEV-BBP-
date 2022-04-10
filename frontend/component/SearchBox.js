import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { CardBank } from "./CardBank";
import bank from "./bank.json";

export const SearchBox = () => {
  const [search, setSearch] = useState("");
  const [fillBank, setFillBank] = useState(bank);
  const filterbank = (text) => {
    if (text !== "") {
      const filteredData = bank.filter((item) => {
        return Object.values(item.name)
          .join("")
          .toLowerCase()
          .includes(text.toLowerCase())
          ;
      });
      setFillBank(filteredData);
      setSearch(text)
    } else {
      setFillBank(bank);
      setSearch(text)
    }
  };
  return (
    <div>
      <div style={{ margin: "20px 30px" }}>
        <Row>
          <Col xs lg="2">
            <input
              type="int"
              className="form-control"
              id="search"
              placeholder="Search..."
              onChange={(e) => filterbank(e.target.value)}
              Value={search}
            ></input>
          </Col>
          <Col xs lg="2">
            <Form.Select aria-label="Default select example">
              <option>New first</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
        </Row>
        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(2, auto)",
            gridGap: "40px",
          }}
        >
          {fillBank.map((bank) => (
            <CardBank key={bank.id} {...bank} />
          ))}
        </div>
      </div>
    </div>
  );
};
