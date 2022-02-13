import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
export const Acctlist = (account) => (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: 10,
      padding: 16,
      marginBottom: 8,
      margin: 10,
    }}
  >
    <div className="row">
      <div className="col-8">
        <h4 style={{ marginTop: 0 }}>{account.ac_title}</h4>
        {account.ac_date} {account.ac_time}
      </div>
      <div className="col-4">
        <h4 style={{ marginTop: 0 }}><div style={{border: "1px solid red",borderRadius:10,justifyConetent:"center"}}>{account.ac_type}</div></h4>
        {account.amount} บาท
    </div>
    </div>
  </div>
);
