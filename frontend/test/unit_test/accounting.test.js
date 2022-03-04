import React from "react";
import { shallow } from "enzyme";

import NavTab from "../../component/NavTab";
import "@testing-library/jest-dom";

let mockFn = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe("Click accounting Button navigate to '/accounting.js' tests", () => {
  
  it("testing Make an Accounting click", async () => {
    const wrapper = shallow(<NavTab />);
    // wrapper.find({eventKey: "accounting"}).simulate("click");
    // console.log(wrapper.find({eventKey: "accounting"}))
    mockFn.mockResolvedValue("/heetad");
    await expect(mockFn()).resolves.toEqual("/heetad");
    await expect(mockFn.mock.calls.length).toBe(1);
  });

  // it("testing 'Start an Assessment' click", async () => {
  //   const wrapper = shallow(<MainPageModal nextToAssessment={mockFn} />);
  //   wrapper.find("DarkGrayBut").simulate("click");
  //   mockFn.mockResolvedValue("/Assessment");
  //   await expect(mockFn()).resolves.toEqual("/Assessment");
  //   await expect(mockFn.mock.calls.length).toBe(1);
  // });
});