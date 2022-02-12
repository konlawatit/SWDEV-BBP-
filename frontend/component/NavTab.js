import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa0, faBank, faChartLine, faChartPie, faFaceRelieved, faMoneyBill, faMoneyBillWave, faWallet } from '@fortawesome/free-solid-svg-icons'
export default function NavTab() {
  return (
    <SideNav className='bg-dark text-warning'
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="dashboard">
        <NavItem eventKey="dashboard">
            <NavIcon>
                <FontAwesomeIcon icon={faChartPie} />
            </NavIcon>
            <NavText>
                Dashboard
            </NavText>
        </NavItem>
        <NavItem eventKey="accounting">
            <NavIcon>
                <FontAwesomeIcon icon={faWallet} />
            </NavIcon>
            <NavText>
                Accounting
            </NavText>
        </NavItem>
        <NavItem eventKey="installment">
            <NavIcon>
                <FontAwesomeIcon icon={faMoneyBillWave} />
            </NavIcon>
            <NavText>
                Installment
            </NavText>
        </NavItem>
        <NavItem eventKey="interest">
            <NavIcon>
                <FontAwesomeIcon icon={faBank} />
            </NavIcon>
            <NavText>
                Interest Rate
            </NavText>
        </NavItem>
    </SideNav.Nav>
</SideNav>
  )
}
