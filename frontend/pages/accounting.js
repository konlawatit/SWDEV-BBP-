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

const clientId = '1027123282693-9ogb4r62q7ojg8t5tasqnmrfeplaj64f.apps.googleusercontent.com';

export default function Accounting({file}) {
  const { data: session } = useSession()
  if (session) {
    console.log(process.env, session)
    axios.get(`${process.env.SERVER_URL}/accounting/get`, {
      headers: {
        email: "konlawatit@gmail.com"
      }
    }).then(response => {
      console.log('response', response)
    }).catch(err => {
      console.log('err', err)
    })
  } else {
    console.log('no session')
  }
  const [loginModal, setLoginModal] = useState(false);
  const loginClose = () => setLoginModal(false);
  const loginShow = () => setLoginModal(true);
  const [accountlist, setAccountlist] = useState(data);
  const viewIncome = data
    .filter((item) => item.ac_type === "income")
    .map((data) => data);
  const viewExpenses = data
    .filter((item) => item.ac_type === "expenses")
    .map((data) => data);
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
              <Linechart />
            </div>
            <div className="row">
              <Barchart></Barchart>
            </div>
          </div>
          <div className="col border border-secondary rounded">
              <div className="row mt-3 mb-6">
                <div className="col-3 text-center btn">
                  <h4
                    onClick={() => setAccountlist(data)}
                    style={{ color: accountlist === data ? "blue" : "black" }}
                  >
                    ทั้งหมด
                  </h4>
                </div>
                <div className="col-3 text-center btn">
                  <h4
                    onClick={() => setAccountlist(viewIncome)}
                    style={{
                      color: accountlist === viewIncome ? "blue" : "black",
                    }}
                  >
                    รายรับ
                  </h4>
                </div>
                <div className="col-3 text-center btn">
                  <h4
                    onClick={() => setAccountlist(viewExpenses)}
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
                  {accountlist.map((account) => (
                    <Acctlist key={account.id} {...account} />
                  ))}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-8"></div>
                <div className="col-4 text-center mt-5">
                  <button className="btn btn-dark p-4 text-white" style={{'borderRadius':'40px'}}>
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
            buttonText="Sign in with google"
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
      
    </div>
  );
}
