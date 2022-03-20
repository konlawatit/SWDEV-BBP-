const { expect } = require("chai");
const request = require("supertest");
const app = require("../../index.js");

const mongoose = require("mongoose");
const mongoUnit = require("mongo-unit");

const mockData = require("../__mock__/mockData");

describe("Accounting", () => {
    before(() => mongoose.connect(process.env.MONGO_TEST_URL));
    beforeEach(() => mongoUnit.load(mockData));
    afterEach(() => mongoUnit.drop());
  
    it("get accounting list by email response status 200 OK and data length equal 11", async () => {
      // console.log(await request(app))
      const response = await request(app).get("/accounting/get").set({email: '62070007@it.kmitl.ac.th'})
    
      expect(response.body.length).to.equal(11);
      expect(response.statusCode).to.equal(200);
    });

    it("add accounting list and send payload response status 200 OK", async () => {
      // console.log(await request(app))
      const response = await request(app).post("/accounting/add").send({ title: "test1" , date: new Date() , amount: 100 , type: 'income' , description: '' , email: '62070007@it.kmitl.ac.th'  })    
      expect(response.statusCode).to.equal(200);
    });

})