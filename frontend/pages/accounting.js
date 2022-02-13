import React from "react";
import NavTab from "../component/NavTab";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Barchart } from "../component/Barchart";
import { Linechart } from "../component/Linechart";
import { Acctlist } from "../component/Acclist";
import data from "../component/accounting.json";

export default function Accounting() {
  return (
    <div>
      <NavTab></NavTab>
      <div className="mt-3" style={{ marginLeft: "10%" }}>
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-start">
              <h1>Accounting</h1>
            </div>
            <div className="d-flex flex-column">
              <h5>บัญชีรายรับรายจ่าย</h5>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-end">
              <h4 className="p-2 mt-3">
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ "padding-right": "10px" }}
                />
                ผู้ใช้หมายเลข 1
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row mb-3 mt-3">
              <Linechart />
            </div>
            <div className="row">
              <Barchart></Barchart>
            </div>
          </div>
          <div className="col-6">
            <div
              className="border border-secondary rounded mt-3"
              style={{ height: "85vh" }}
            >
              <div className="row mt-3 mb-6">
                <div className="col-3" style={{ "padding-left": "20px" }}>
                  <h4>ทั้งหมด</h4>
                </div>
                <div className="col-3">
                  <h4>รายรับ</h4>
                </div>
                <div className="col-3">
                  <h4>รายจ่าย</h4>
                </div>
                <div className="col-3">
                  <h4>
                    <FontAwesomeIcon icon={faCalendar} />
                  </h4>
                </div>
              </div>
              {data.map((account) => (
                <Acctlist {...account} />
              ))}
              <div className="row">
                <div className="col-8"></div>
                <div className="col-4"><button className="button"><h4>เพิ่มรายการ</h4></button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
