const { expect } = require("chai");
const request = require("supertest");
const app = require("../../index.js");

const mongoose = require("mongoose");
const mongoUnit = require("mongo-unit");

const mockData = require("../__mock__/mockData");

const {findOneAccounting, saveAccounting} = require("../../repository/accounting.js")

describe("Accounting", () => {
    before(() => mongoose.connect(process.env.MONGO_TEST_URL));
    beforeEach(() => mongoUnit.load(mockData));
    afterEach(() => mongoUnit.drop());
  
    it("should find one accounting data", async () => {
      findOneAccounting("62070007@it.kmitl.ac.th").then(res => {
        expect(res.length).to.equal(1)
      })
    });

    it("should add data success", async () => {
      saveAccounting({ title: "test1" , date: new Date() , amount: 100 , type: 'income' , description: '' , email: '62070007@it.kmitl.ac.th'  }).then(res => {
        expect(res.length).to.equal(1)
      })
    });

})