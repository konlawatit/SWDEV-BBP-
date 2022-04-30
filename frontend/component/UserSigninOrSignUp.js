import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {Modal,Button } from 'react-bootstrap'
import axios from "axios";

import { setUser } from "../redux/actions/main";

const SERVER_URL = process.env.SERVER_URL

const UserSigninOrSignUp = (props) => {
    const [loginModal, setLoginModal] = useState(false);
    const loginClose = () => setLoginModal(false);
    const loginShow = () => setLoginModal(true);
    const [session, setSession] = useState(false);
    // const [user, setUser] = useState(props.main);
    
    useEffect(() => {
        axios.get(`${SERVER_URL}/auth/authen`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokens_bbp')}`
            }
        }).then(results => {
            // console.log(results)
            setSession(true)
            props.setUser(results.data)
            console.log('success', props.main)
        }).catch(err => {
            setSession(false)
            // setUser(null)
            console.log(err)
        })
    }, [])

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
              {/* Signed in as {console.log(props)} */}
            </h4>
          </button>
        )}
      </div>

      <Modal id="loginModal" show={loginModal} onHide={loginClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>เข้าสู่ระบบ</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <button>Sign in with Google</button>
        </Modal.Body>
        <Modal.Footer>
          <Button id="close" variant="secondary" onClick={loginClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = state => ({
    main: state.main
})

const mapDispatchToProps = {
    setUser: setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSigninOrSignUp)
