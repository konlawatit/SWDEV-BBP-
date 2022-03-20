const { expect } = require("chai");
const request = require("supertest");
const app = require("../../index");

const mongoose = require("mongoose");
const mongoUnit = require("mongo-unit");

const mockData = require("../__mock__/mockData");

describe("applications", () => {
    before(() => mongoose.connect(process.env.MONGO_TEST_URL));
    beforeEach(() => mongoUnit.load(mockData));
    afterEach(() => mongoUnit.drop());
  
    it("should response status 200 OK", async () => {
      const response = await request(app).get("/accouting/test");
      expect(response.statusCode).to.equal(200);
    });
  
})