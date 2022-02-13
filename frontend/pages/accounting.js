import React, { useState,useEffect } from "react";
import NavTab from "../component/NavTab";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Barchart } from "../component/Barchart";
import { Linechart } from "../component/Linechart";
import { Acctlist } from "../component/Acclist";
import data from "../component/accounting.json";



export default function Accounting() {
  const [accountlist, setAccountlist] = useState(data)
  const viewIncome = data.filter((item)=>item.ac_type === "income").map((data)=>data);
  const viewExpenses = data.filter((item)=>item.ac_type === "expenses").map((data)=>data);
  return (
    <div>
      <NavTab></NavTab>
      <div className="container mt-3" style={{ marginLeft: "10%" }}>
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
              className="container border border-secondary rounded mt-3"
            >
              <div className="row mt-3 mb-6">
                <div className="col-3" >
                  <h4 onClick={()=> setAccountlist(data)} style={{color:accountlist===data?"blue":"black"}}>ทั้งหมด</h4>
                </div>
                <div className="col-3" >
                <h4 onClick={()=> setAccountlist(viewIncome)} style={{color:accountlist===viewIncome?"blue":"black"}}>รายรับ</h4>
                </div>
                <div className="col-3" >
                <h4 onClick={()=> setAccountlist(viewExpenses)} style={{color:accountlist===viewExpenses?"blue":"black"}}>รายจ่าย</h4>
                </div>
                <div className="col-3">
                  <h4>
                    <FontAwesomeIcon icon={faCalendar} />
                  </h4>
                </div>
              </div>
              <div className="row" style={{height:500,overflowY: "scroll"}}>
                <div className="col">
                {accountlist.map((account) => (
                <Acctlist key={account.id} {...account} />
              ))}
                </div>
              </div>
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
