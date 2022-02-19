import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
const center = {
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
};
export const Acctlist = (account) => { 
  var date = new Date(account.date)
  var time = date.getHours()+":"+date.getMinutes()+" น."
  date = ("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth()+1)).slice(-2)+"/"+date.getFullYear()
  return(
  <div
    className="row"
    style={{
      border: "1px solid #ddd",
      borderRadius: 10,
      padding: 16,
      marginBottom: 8,
      margin: 10,
    }}
  >
    <div className="col-8">
      <h4 style={{ marginTop: 0 }}>{account.title}</h4>
      วันที่ {date} เวลา {time}
    </div>
    <div className="col-4">
      <h4 style={center}>
        <div
          style={{
            border: "1px solid",
            color: account.type === "expenses" ? "red" : "green",
            borderRadius: 10,
            padding: 5,
          }}
        >
          {account.type == "expenses" ? "รายจ่าย" : "รายรับ"}
        </div>
      </h4>
      <p style={center}>{account.amount} บาท</p>
    </div>
  </div>
);
}