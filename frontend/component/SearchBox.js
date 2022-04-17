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
  const sortBy = (value) => {
    if (value == "1") {
      bank
    }else if (value == "2") {

    }else if (value == "3") {

    }
  }
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
            {/* <Form.Select aria-label="Default select example" onChange={(e) => (sortBy(e.target.value))}>
              <option>Sort by</option>
              <option value="1">MLR</option>
              <option value="2">MOR</option>
              <option value="3">MRR</option>
            </Form.Select> */}
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
