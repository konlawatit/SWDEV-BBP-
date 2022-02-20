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

import axios from 'axios'

import { useSession, signIn, signOut, getProviders, getCsrfToken } from "next-auth/react"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function Accounting({file}) {
  const { data: session } = useSession()
  const [loginModal, setLoginModal] = useState(false);
  const [addItemModal, setAddItemModal] = useState(false);
  const loginClose = () => setLoginModal(false);
  const loginShow = () => setLoginModal(true);
  const addItemModalClose = () => setAddItemModal(false);
  const addItemModalShow = () => setAddItemModal(true);
  const [date,setDate] = useState(new Date());
  console.log(SERVER_URL)
  // console.log(process.env.NEXT_PUBLIC_TEST)
  // console.log(NEXTAUTH_URL)
  
  const [accountlist, setAccountlist] = useState([]);
  const [filterAc, setFilterAc] = useState([]);
  const viewIncome = data
    .filter((item) => item.ac_type === "income")
    .map((data) => data);
    const viewExpenses = data
    .filter((item) => item.ac_type === "expenses")
    .map((data) => data);
    
    useEffect(() => {
      console.log(process.env)
    if (session) {
      console.log('111111111111111111111')
      axios.get(`${SERVER_URL}/accounting/get`, {
        headers: {
          email: session.user.email
        }
      }).then(response => {
        console.log('response', response)
        setAccountlist(response.data)
        setFilterAc(response.data)
      }).catch(err => {
        console.log('err', err)
      })
    } else {
      console.log('no session')
    }
  }, [session])

  const options = [
    { value: "income", label: "รายรับ" },
    { value: "expenses", label: "รายจ่าย" },
  ];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");

  const onSubmit = () => {
    if (title == "" && amount > 0 && type != "") {
      alert("โปรดใส่ชื่อรายการ");
    } else if (title != "" && amount == 0 && type != "") {
      alert("โปรดใส่จำนวนเงิน");
    } else if (title != "" && amount <= 0 && type != "") {
      alert("จำนวนเงินต้องไม่ติด - และมากกว่า 0");
    } else if (title != "" && amount > 0 && type == "") {
      alert("โปรดเลือกประเภทของรายการ");
    } else if (title != "" && amount > 0 && type != "") {
        axios.post(`${SERVER_URL}/accounting/add`, {
        title: title,
        date: date,
        amount: amount,
        type: type,
        description: description,
        email:session.user.email
        })
        .then(function (response) {
          addItemModalClose();
          alert("เพิ่มรายการสำเร็จ");
        })
        .catch(function (error) {
        console.log(error);
        alert("เพิ่มรายการไม่สำเร็จ");
        });
      }
  };



  return (
    <div>
      <div className="mt-3" style={{ marginLeft: "10%",marginRight:'10%'}}>
        <NavTab></NavTab>
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
              {!session ? 
              (<button className="btn" onClick={loginShow}>
              <h4 className="p-2 mt-3">
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ "padding-right": "10px" }}
                />
                Sign In
              </h4>
              </button>) : (<button className="btn" onClick={loginShow}>
              <h4 className="p-2 mt-3">
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ "padding-right": "10px" }}
                />
                Signed in as {session.user.email}
              </h4>
              </button>)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6" style={{marginRight:10}}>
            <div className="row mb-2">
              <Linechart key={accountlist.id} {...accountlist}/>
            </div>
            <div className="row">
              <Barchart key={accountlist.id} {...accountlist}/>
            </div>
          </div>
          <div className="col border border-secondary rounded">
              <div className="row mt-3 mb-6">
                <div className="col-3 text-center btn">
                  <h4
                    // onClick={() => setAccountlist(data)}
                    onClick={() => {
                      setFilterAc(accountlist)

                    }}
                    style={{ color: accountlist === data ? "blue" : "black" }}
                  >
                    ทั้งหมด
                  </h4>
                </div>
                <div className="col-3 text-center btn">
                  <h4
                    onClick={() => {
                      // accountlist.filter(ac => ac.type === "income")
                      setFilterAc(accountlist.filter(ac => ac.type === "income"))
                    }}
                    style={{
                      color: accountlist === viewIncome ? "blue" : "black",
                    }}
                  >
                    รายรับ
                  </h4>
                </div>
                <div className="col-3 text-center btn">
                  <h4
                    onClick={() => {
                      // setAccountlist(viewExpenses)
                      setFilterAc(accountlist.filter(ac => ac.type === "expenses"))

                    }}
                    style={{
                      color: accountlist === viewExpenses ? "blue" : "black",
                    }}
                  >
                    รายจ่าย
                  </h4>
                </div>
                <div className="col-3 text-center btn">
                  <h4>
                    <FontAwesomeIcon icon={faCalendar} />
                  </h4>
                </div>
              </div>
              <div className="row" style={{ height: '60vh', overflowY: "scroll" }}>
                <div className="col">
                  {filterAc.map((account) => (
                    <Acctlist key={account._id} {...account} />
                  ))}
                </div>
              </div>
              <div className="row mb-2">
              <div className="col-8 text-center mt-5">
                  <button className="btn btn-dark p-4 text-white" style={{'borderRadius':'40px'}}
                  onClick={() => {
                    axios.get(`${SERVER_URL}/accounting/get/gmail/krungthai` ,{
                      headers: {
                        email: session.user.email
                      }
                    }).then(res => {
                      console.log('success')
                      axios.get(`${SERVER_URL}/accounting/get`, {
                        headers: {
                          email: session.user.email
                        }
                      }).then(response => {
                        console.log('response', response)
                        setAccountlist(response.data)
                        setFilterAc(response.data)
                      }).catch(err => {
                        console.log('err', err)
                      })
                    }).catch(err => {
                      console.log('err', err)
                    })
                  }}>
                  ดึงข้อมูลการจ่ายเงินจาก Email (ธนาคารกรุงไทย)
                  </button>
                </div>
                <div className="col-4 text-center mt-5">
                  <button className="btn btn-dark p-4 text-white" style={{'borderRadius':'40px'}} 
                  onClick={addItemModalShow}
                  >
                    เพิ่มรายการ
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>

      <Modal show={loginModal} onHide={loginClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>เข้าสู่ระบบ</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {/* <GoogleLogin
            clientId={clientId}
            accessType="offline"
            scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly openid https://www.googleapis.com/auth/userinfo.email"
            // prompt="consent"
            buttonText="Sign in with google"
            // accessType="offline"
            responseType="code"
            onSuccess={(response) => {
              console.log('response on success', response)
              axios.post("http://localhost:3030/auth/code", {
                code: response.code
              }).then(res => {
                console.log('pass', res.data)
              }).catch(err => {
                console.log('err', err)
              })
            }}
            onFailure={(response) => {
              console.log('response on failure', response)
            }}
            cookiePolicy={'single_host_origin'}
          /> */}
          {session? (<button onClick={() => signOut()}>Sign out</button>) : (<button onClick={() => signIn("google")}>Sign in with Google</button>)}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={loginClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={addItemModal} onHide={addItemModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>บันทึกรายรับ-รายจ่าย</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
        <form>
            <div className="form-row">
              <div className="form-group mb-3">
                <label htmlFor="title">ชื่อรายการ</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  Value={title}
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">คำอธิบาย</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="เพิ่มคำอธิบายของคุณเพื่อให้เข้าใจง่ายขึ้น"
                onChange={(e) => setDescription(e.target.value)}
                Value={description}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="amount">จำนวนเงิน (บาท)</label>
              <input
                type="int"
                className="form-control"
                id="amount"
                placeholder="100, 500, 1000, ...."
                onChange={(e) => setAmount(e.target.value)}
                Value={amount}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="ac_type">ประเภทรายการ</label>
                <select
                  id="ac_type"
                  className="form-control"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={""} selected>
                    โปรดเลือกประเภท...
                  </option>
                  <option value={"income"}>รายรับ</option>
                  <option value={"expenses"}>รายจ่าย</option>
                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={onSubmit}>
                    ยืนยัน
          </button>
          <Button variant="danger" onClick={addItemModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
}
