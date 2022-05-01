import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Router, useRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

import { setUser, clearUser } from "../redux/actions/main";

const SERVER_URL = process.env.SERVER_URL;

const UserSigninOrSignUp = (props) => {
  const router = useRouter()
  const [loginModal, setLoginModal] = useState(false);
  const loginClose = () => setLoginModal(false);
  const loginShow = () => setLoginModal(true);
  const [session, setSession] = useState(false);
  // const [user, setUser] = useState(props.main);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/auth/authen`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokens_bbp")}`
        }
      })
      .then((results) => {
        // console.log(results)
        console.log(results);
        setSession(true);
        props.setUser(results.data);
        console.log("success", props.main);
      })
      .catch((err) => {
        setSession(false);
        // setUser(null)
        console.log(err);
      });
  }, []);

  const signOut = () => {
    localStorage.removeItem("tokens_bbp")
    props.clearUser()
    setSession(false)
  }

  return (
    <>
      <div className="d-flex justify-content-end">
        {!session ? (
          <button id="btn-signin" className="btn" onClick={loginShow}>
            <h4 className="p-2 mt-3">
              <FontAwesomeIcon
                icon={faUser}
                style={{ "padding-right": "10px" }}
              />
              Sign In
            </h4>
          </button>
        ) : (
          <button className="btn" onClick={loginShow}>
            <h4 className="p-2 mt-3">
              <FontAwesomeIcon
                icon={faUser}
                style={{ "padding-right": "10px" }}
              />
              Signed in as {props.main.email}
            </h4>
          </button>
        )}
      </div>

      <Modal id="loginModal" show={loginModal} onHide={loginClose} centered>
        {!session ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>เข้าสู่ระบบ</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <button onClick={() => router.push('/signin')} >เข้าสู่ระบบ</button>
              <button onClick={() => router.push('/signup')} >สมัคร</button>
            </Modal.Body>
            <Modal.Footer>
              <Button id="close" variant="secondary" onClick={loginClose}>
                Close
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>ผู้ใช้งาน {props.main.email}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <button onClick={() => signOut()} >ออกจากระบบ</button>
            </Modal.Body>
            <Modal.Footer>
              <Button id="close" variant="secondary" onClick={loginClose}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  main: state.main
});

const mapDispatchToProps = {
  setUser: setUser,
  clearUser: clearUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSigninOrSignUp);
