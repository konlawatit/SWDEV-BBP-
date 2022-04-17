import React, { useState, useEffect } from "react";
import NavTab from "../component/NavTab";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SearchBox } from "../component/SearchBox";
import { BankDetail } from "../component/BankDetail";

const SERVER_URL = process.env.SERVER_URL


const Interest = () => {
  return (
    <div>
      <div className="mt-3" style={{ marginLeft: "10%",marginRight:'10%'}}>
        <NavTab></NavTab>
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-start">
              <h1 id="test1">Interest</h1>
            </div>
            <div className="d-flex flex-column">
              <h5>ดอกเบี้ยธนาคาร</h5>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-end">
            </div>
          </div>
        </div>
        <div className="row">
          <SearchBox/>
        </div>
        {/* <div>
          <BankDetail/>
        </div> */}
      </div>
    </div>
  );
}

export default Interest
