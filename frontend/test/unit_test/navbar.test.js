import React from "react";
import { shallow } from "enzyme";
import NavTab from "../../component/NavTab";
import Accounting from "../../pages/accounting";

import "@testing-library/jest-dom";
let mockFn = jest.fn();

describe("Test Navbar components", () => {
  it("Navbar Rederer with noting crash", async () => {
    const wrapper = shallow(<NavTab />);
    await expect(wrapper.find("NavItem")).toEqual({});
  });
  it("Check router default state equal ''", async () => {
    const wrapper = shallow(<NavTab />);
    const router = wrapper.find(".bg-secondary")
    await expect(router.prop('route')).toEqual("");
  });
  it("Change route state to accounting correctly", async () => {
    const wrapper = shallow(<NavTab />);
    const button = wrapper.find({eventKey: "accounting"})
    button.simulate('click');
    const router = wrapper.find(".bg-secondary")
    await expect(router.prop('route')).toEqual("accounting");
  });
  it("Routing state to accounting correctly", async () => {
    const wrapper = shallow(<NavTab/>);
    const button = wrapper.find({eventKey: "accounting"})
    button.simulate('click');
    await expect(wrapper.find(Accounting)).toHaveLength(0);
  });

});