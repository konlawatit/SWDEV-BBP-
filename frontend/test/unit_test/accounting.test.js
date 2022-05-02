import React from "react";
import { shallow,mount } from "enzyme";
import {Modal,Button} from 'react-bootstrap'
import client, { Session, useSession } from "next-auth/react";
import NavTab from "../../component/NavTab";
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import Accounting from "../../pages/accounting";
import "@testing-library/jest-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
jest.mock("next-auth/react");



afterEach(() => {
  jest.clearAllMocks();
});



describe("LoginModal", () => {
  
  it("should render modal when click SignIn button", async () => {
    const wrapper = shallow(<Accounting></Accounting>);
    const btn = wrapper.find('#btn-signin')
    btn.simulate('click');
    const modal = wrapper.find('#loginModal')
    expect(modal.prop('show')).toEqual(true)
  });
});

describe("addModal", () => {
  
  // it("should render modal when click Add button", async () => {
  //   const wrapper = shallow(<Accounting></Accounting>);
  //   const btn = wrapper.find('#additem')
  //   btn.simulate('click')
  //   const modal = wrapper.find('#addmodal')
  //   expect(modal.prop('show')).toEqual(true)
  // });

  it("should close modal when click close button", async () =>{
    const wrapper = shallow(<Accounting></Accounting>);
    const btn = wrapper.find('#closeAdd')
    btn.simulate('click')
    const modal = wrapper.find('#addmodal')
    expect(modal.prop('show')).toEqual(false)
  });

});