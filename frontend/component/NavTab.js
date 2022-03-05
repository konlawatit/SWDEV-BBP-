import React from 'react';
import { Router, useRouter } from 'next/router'
import { useState } from 'react';
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { fa0, faBank, faChartLine, faChartPie, faFaceRelieved, faMoneyBill, faMoneyBillWave, faWallet } from '@fortawesome/free-solid-svg-icons'
export default function NavTab() {
    const [link, setLink] = useState("")
    const router = useRouter()
    const routerTo  = (linkTo) =>{
        router.push('/'+linkTo)
    }
    const setRouter = (path) => {
        setLink(path)
    }
  return (
    <SideNav className='bg-secondary'
    onSelect={(selected) => {
        routerTo(selected)
        setLink(selected)
    }}
    route={link}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="">
        <NavItem eventKey="">
            <NavIcon>
                <FontAwesomeIcon icon={faChartPie} className="text-white"/>
            </NavIcon>
            <NavText style={{color:'white'}}>
                Dashboard
            </NavText>
        </NavItem>
        <NavItem eventKey="accounting" onClick={()=> setRouter("accounting")}> 
            <NavIcon>
                <FontAwesomeIcon icon={faWallet} className="text-white" />
            </NavIcon>
            <NavText style={{color:'white'}}>
                Accounting
            </NavText>
        </NavItem>
        <NavItem eventKey="installment">
            <NavIcon>
                <FontAwesomeIcon icon={faMoneyBillWave} className="text-white"/>
            </NavIcon>
            <NavText style={{color:'white'}}>
                Installment
            </NavText>
        </NavItem>
        <NavItem eventKey="interest" nav>
            <NavIcon>
                <FontAwesomeIcon icon={faBank} className="text-white"/>
            </NavIcon>
            <NavText style={{color:'white'}}>
                Interest Rate
            </NavText>
        </NavItem>
    </SideNav.Nav>
</SideNav>
  )
}
