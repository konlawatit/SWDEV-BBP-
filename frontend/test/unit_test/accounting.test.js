import React from "react";
import { render, screen } from "@testing-library/react";
import client, { Session, useSession } from "next-auth/react";
import Accounting from "../../pages/accounting";
import "@testing-library/jest-dom";
jest.mock("next-auth/react");

describe("Accounting Page", () => {
  it("should sign in modal show", async () => {
    useSession.mockReturnValueOnce([
      {
        user: {
          email: "foo@bar.com"
        }
      },
      false
    ]);

    render(<Accounting />)
    const text = document.querySelector('#test1')
    expect(text).toBeInTheDocument()
    
    
    // screen.getByRole("button", {'name': /sign in/i});
    // screen.getByLabelText( /sign in/i)
  });
});
