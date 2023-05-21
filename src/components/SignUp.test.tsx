import {fireEvent, render, screen, waitFor } from "@testing-library/react"
import SignUp from "./SignUp"

describe("Test SignUp component",()=>{
    test("Check max length of username", async()=>{
        render(<SignUp/>)
        const submitBtn = screen.getByRole("button")
        fireEvent.click(submitBtn)
        await  waitFor(()=>{})
        expect(screen.queryByText(/cannot be empty/i))
    })
})