import React, { useState, useEffect } from "react";
import NavTab from "../component/NavTab";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Barchart } from "../component/Barchart";
import { Linechart } from "../component/Linechart";
import { Acctlist } from "../component/Acclist";
import data from "../component/accounting.json";
import {Modal,Button } from 'react-bootstrap'
import {GoogleLogin} from 'react-google-login';
import { connect } from "react-redux";
import { setUser } from "../redux/actions/main";
import { Installlist } from "../component/Installlist";
import Typography from '@mui/material/Typography';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'
import UserSigninOrSignUp from "../component/UserSigninOrSignUp";

const SERVER_URL = process.env.SERVER_URL


const Installment = (props) => {
    const [addItemModal, setAddItemModal] = useState(false);
    const addItemModalClose = () => setAddItemModal(false);
    const addItemModalShow = () => setAddItemModal(true);


    const [name,setName] = useState("");
    const [type,setType] = useState("");
    const [amount,setAmount] = useState("");
    const [paydate,setPaydate] = useState("");
    const [paycost,setPaycost] = useState("");
    const [moreinfo,setMoreinfo] = useState("");
    const [percentage,setPercentage] = useState(0);
    const [mustpay,setMustpay] = useState(0);
    const [payalready,setPayalready] = useState(0);

    const [addname,setAddname] = useState("");
    const [addamount,setAddamount] = useState(0);
    const [addtype,setAddtype] = useState("");
    const [addpay,setAddpay] = useState("");
    const [addperiod,setAddperiod] = useState("");
    const [description,setDescription] = useState("");
    const [payday,setPayday] = useState("");

    const [data, setData] = useState([]);

    const submitForm = () => {
      axios.post(`${SERVER_URL}/installment/add`, {
        "name": addname,
        "type": addtype,
        "total": addamount,
        "next_pay": addpay,
        "amount_period": addperiod,
        "current_period": 0,
        "description": description,
        "payment_day": payday,
        "status": "รอชำระ"
        }, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('tokens_bbp')}`
          }
        }).then(res => {
          addItemModalClose()
          setData(res.data.in_list)
        })
    }



    const setItem = (data) =>{
        setName(data.name)
        setType(data.type)
        setAmount(data.total)
        setPaydate(data.payment_day)
        setPaycost(data.next_pay)
        setMoreinfo(data.description)
        setMustpay(data.amout_period-data.current_period)
        setPayalready(data.current_period)
        setPercentage(((data.current_period*100)/data.amout_period).toFixed(2))
    }

    useEffect(() => {
      axios.get(`${SERVER_URL}/installment/`, {headers: {
        authorization: `Bearer ${localStorage.getItem("tokens_bbp")}`
      }}).then(results => {
        setData(results.data.in_list)
      }).catch(err => {
        console.log(err)
      })
    }, [])

  return (
    <div>
      <div className="mt-3" style={{ marginLeft: "10%",marginRight:'10%'}}>
        <NavTab></NavTab>
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-start">
              <h1 id="test1">Installment</h1>
            </div>
            <div className="d-flex flex-column">
              <h5>รายการผ่อน</h5>
            </div>
          </div>
          <div className="col-6">
            <UserSigninOrSignUp />
          </div>

          </div>
          <div className="row">
              <div className="col-4">
                <div className="border border-success rounded" style={{ height: "40vh"}}>
                    <div className="row" style={{marginLeft:'20px',marginTop:'20px'}}>
                    <h5>ชำระไปแล้วทั้งสิ้น</h5>
                    </div>
                    <div className="row" style={{display:'flex',justifyContent:'center'}}>
                    <div style={{ width: 200, height: 200 }}>
                    <CircularProgressbar value={percentage} text={`${percentage}%`}  />
                    </div>
                    </div>
                    <div className="row" >  
                        <div className="col-6 text-center">
                        <h5>ที่ต้องชำระ : {mustpay}</h5>
                        </div>
                        <div className="col-6 ">
                        <h5>ชำระแล้ว : {payalready}</h5>
                        </div>
                    </div>
                </div>
              </div>
              <div className="col-8">
              <div className="border border-success rounded" style={{ height: "40vh",padding:"20px" }}>
              <Typography variant="h6" gutterBottom component="div">
              ชื่อรายการผ่อน : {name}
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
            รูปแบบการผ่อน : {type}
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
            คงเหลือที่ต้องจ่าย : {amount}
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
            วันที่ต้องชำระครั้งต่อไป : {paydate}
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
            จำนวนเงินที่ต้องชำระเดือนนี้ : {paycost}
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
            รายละเอียดเพิ่มเติม : {moreinfo}
            </Typography>
              </div>
              </div>
          </div>
          <div className="row mt-4">
              <Installlist install={data} myfunc={setItem}/>
          </div>
          <div className="row mb-2">
                <div className="col mt-3" style={{display:'flex',justifyContent:'end'}}>
                  <button id="additem" className="btn btn-success p-4 text-white" style={{'borderRadius':'40px'}} 
                  onClick={addItemModalShow}>
                    เพิ่มรายการ
                  </button>
                </div>
        </div>
          
        </div>

        <Modal show={addItemModal} onHide={addItemModalClose} centered id="addmodal">
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มรายการผ่อน</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
        <form>
            <div className="form-row">
              <div className="form-group mb-3">
                <label htmlFor="addname">ชื่อรายการผ่อน</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="เช่น ผ่อนบ้านเดี่ยว"
                  id="addname"
                  onChange={(e) => setAddname(e.target.value)}
                  Value={addname}
                />
              </div>
            </div>
            <div className="mb-3">
               <div clasName="row" style={{display:'flex',justifyContent:'center'}}>
                   <div className="col-5">
                   <label htmlFor="addamount">วงเงินกู้ / ราคา (บาท)</label>
                    <input
                        type="text"
                        placeholder="3500000"
                        className="form-control"
                        id="addamount"
                        onChange={(e) => setAddamount(e.target.value)}
                        Value={addamount}
                    />
                   </div>
                   <div className="col-1"></div>
                   <div className="col-5">
                   <label htmlFor="addtype">ประเภทการผ่อน</label>
                    <input
                        type="text"
                        placeholder="รายเดือน"
                        className="form-control"
                        id="addtype"
                        onChange={(e) => setAddtype(e.target.value)}
                        Value={addtype}
                    />
                    </div>
                   </div>
               </div>
               <div className="mb-3">
               <div clasName="row" style={{display:'flex',justifyContent:'center'}}>
                   <div className="col-5">
                   <label htmlFor="addpay">ราคาผ่อนต่องวด (บาท)</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="25000"
                        id="addpay"
                        onChange={(e) => setAddpay(e.target.value)}
                        Value={addpay}
                    />
                   </div>
                   <div className="col-1"></div>
                   <div className="col-5">
                   <label htmlFor="addperiod">ระยะเวลาผ่อนชำระ</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="จำนวนงวด"
                        id="addperiod"
                        onChange={(e) => setAddperiod(e.target.value)}
                        Value={addperiod}
                    />
                    </div>
                   </div>
               </div>

            <label htmlFor="description">คำอธิบาย</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="บ้านพักตากอากาศ จังหวัดระยอง"
                onChange={(e) => setDescription(e.target.value)}
                Value={description}
              />
            <div className="form-group mt-3 mb-3">
            <label htmlFor="payday">วันที่ผ่อนชำระ</label>
              <input
                type="text"
                className="form-control"
                id="payday"
                placeholder="03/05/2022"
                onChange={(e) => setPayday(e.target.value)}
                Value={payday}
              />
              </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={submitForm}>
            ยืนยัน
          </button>
          <Button variant="danger" id="closeAdd" onClick={addItemModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

const mapStateToProps = (state) => ({
  main: state.main
});

const mapDispatchToProps = {
      setUser: setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Installment)
