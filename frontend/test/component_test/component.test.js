import React from "react";
import { shallow,mount } from "enzyme";
import {Modal,Button} from 'react-bootstrap'
import client, { Session, useSession } from "next-auth/react";
import NavTab from "../../component/NavTab";
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import Accounting from "../../pages/accounting";
import { Barchart } from "../../component/Barchart";
import { Linechart } from "../../component/Linechart"
import { Acctlist } from "../../component/Acclist";
import "@testing-library/jest-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
jest.mock("next-auth/react");



afterEach(() => {
  jest.clearAllMocks();
});

const mockData = {
    date:new Date(),
    title:"New item",
    type:"income",
    amount:"1000"

}


describe("", () => {
  it("renders without crashing", async () => {
    shallow(<Accounting></Accounting>);
  });
  it("renders with Barchart", async () => {
    const wrapper = shallow(<Accounting></Accounting>);
    const chart = <Barchart/>
    expect(wrapper.contains(chart)).toEqual(true);
  });
  it("renders with Linechart", async () => {
    const wrapper = shallow(<Accounting></Accounting>);
    const chart = <Linechart/>
    expect(wrapper.contains(chart)).toEqual(true);
  });
  it("accepts data account props", () => {
    const wrapper = mount(<Acctlist account={mockData} />);
    expect(wrapper.props().account).toEqual(mockData);
  });
});


