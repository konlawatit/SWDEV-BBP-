import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavTab from '../component/NavTab'
import React from 'react'

import Navbar from '../component/Navbar'
import {connect} from 'react-redux'
import {incrementCounter,decrementCounter} from '../redux/actions/conterActions'
import Accounting from './accounting'


const Home = (props) => {
  
  return (
    <>
    <Accounting />
    </>
  )
}


// mapStateToProps
// รับฟังก์ชันจาก store มาใช้งาน
const mapStateToProps = state => ({
  counter: state.counter.value
})

// mapDispatchToProps
// ส่งค่าไปยัง store เป็น object
const mapDispatchToProps = {
  incrementCounter: incrementCounter,
  decrementCounter: decrementCounter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)