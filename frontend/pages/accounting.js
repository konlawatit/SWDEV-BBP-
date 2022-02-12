import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavTab from '../component/NavTab'

export default function Accounting() {
  return (
    <div>
        <div className='row' style={{"height":"100vh"}}>
            <div className='col-2 bg-black'>
                <a>Dashboard</a>
            </div>
            <div className='col bg-warning'>

            </div>
        </div>
    </div>
  )
}
