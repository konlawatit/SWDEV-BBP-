import React, { useState, useEffect } from "react";
import NavTab from "../component/NavTab";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function AddAccouting() {
  const border = {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    margin: 10,
  };
  const options = [
    { value: "income", label: "รายรับ" },
    { value: "expenses", label: "รายจ่าย" },
  ];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");

  const onSubmit = () => {
    if (title == "" && amount > 0 && type != "") {
      alert("โปรดใส่ชื่อรายการ");
    } else if (title != "" && amount == 0 && type != "") {
      alert("โปรดใส่จำนวนเงิน");
    } else if (title != "" && amount <= 0 && type != "") {
      alert("จำนวนเงินต้องไม่ติด - และมากกว่า 0");
    } else if (title != "" && amount > 0 && type == "") {
      alert("โปรดเลือกประเภทของรายการ");
    } else if (title != "" && amount > 0 && type != "") {
      alert("เพิ่มรายการสำเร็จ");
    } else {
      alert("เพิ่มรายการไม่สำเร็จ");
    }
  };
  return (
    <div>
      <NavTab></NavTab>
      <div className="row d-flex justify-content-center">
        <div className="col-6 p-5" style={border}>
          <form>
            <div class="form-row">
              <div class="form-group col-md-6 mb-3">
                <label for="title">ชื่อรายการ</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  Value={title}
                />
              </div>
            </div>
            <div class="form-group col-md-10 mb-3">
              <label for="description">คำอธิบาย</label>
              <input
                type="text"
                class="form-control"
                id="description"
                placeholder="เพิ่มคำอธิบายของคุณเพื่อให้เข้าใจง่ายขึ้น"
                onChange={(e) => setDescription(e.target.value)}
                Value={description}
              />
            </div>
            <div class="form-group mb-3">
              <label for="amount">จำนวนเงิน (บาท)</label>
              <input
                type="int"
                class="form-control"
                id="amount"
                placeholder="100, 500, 1000, ...."
                onChange={(e) => setAmount(e.target.value)}
                Value={amount}
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="ac_type">ประเภทรายการ</label>
                <select
                  id="ac_type"
                  class="form-control"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={""} selected>
                    โปรดเลือกประเภท...
                  </option>
                  <option value={"income"}>รายรับ</option>
                  <option value={"expenses"}>รายจ่าย</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <button class="btn btn-danger">ยกเลิก</button>
                <div>
                  <button class="btn btn-success" onClick={onSubmit}>
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
