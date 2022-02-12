import React from 'react';
import NavTab from '../component/NavTab'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
export default function Accounting() {
  return (
      <div>
        <NavTab></NavTab>
        <div className='mt-3' style={{'marginLeft':'10%'}}>
            <div className="row">
                <div className="col-6">
                    <div className='d-flex justify-content-start'>
                        <h1>Accounting</h1>
                    </div>
                    <div className='d-flex flex-column'>
                        <h5>บัญชีรายรับรายจ่าย</h5>
                    </div>
                </div>
                <div className="col-6">
                    <div className='d-flex justify-content-end'>
                        <h4 className="p-2 mt-3"><FontAwesomeIcon icon={faUser} style={{"padding-right":'10px'}}/>ผู้ใช้หมายเลข 1</h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="row mb-3 mt-3">
                        <div className="border border-secondary rounded" style={{'height':'40vh'}}>
                            <h3>รายได้และรายจ่าย</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="border border-secondary rounded" style={{'height':'40vh'}}></div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="border border-secondary rounded mt-3" style={{'height':'85vh'}}></div>
                </div>
            </div>
        </div>
      </div>
  )
}
