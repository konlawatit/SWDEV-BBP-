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
          }
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-6 p-5"style={border}>
        <form>
          <div class="form-row">
            <div class="form-group col-md-6 mb-3">
              <label for="inputEmail4">ชื่อรายการ</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
              />
            </div>
          </div>
          <div class="form-group col-md-10 mb-3">
            <label for="inputAddress">คำอธิบาย</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="เพิ่มคำอธิบายของคุณเพื่อให้เข้าใจง่ายขึ้น"
            />
          </div>
          <div class="form-group mb-3">
            <label for="inputAddress2">Address 2</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">City</label>
              <input type="text" class="form-control" id="inputCity" />
            </div>
            <div class="form-group col-md-4">
              <label for="inputState">State</label>
              <select id="inputState" class="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <label for="inputZip">Zip</label>
              <input type="text" class="form-control" id="inputZip" />
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck" />
              <label class="form-check-label" for="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
