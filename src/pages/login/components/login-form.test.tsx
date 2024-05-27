import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { LoginForm } from "./login-form";
import { act } from "react";
import { fetchWrapper } from "@/lib/network/fetchInterceptor";

jest.mock("@/lib/network/fetchInterceptor")

describe(LoginForm, () => {
  beforeEach(() => {
  })

  test("render login form correctly", () => {
    const { getByText } = render(<LoginForm />);
    const pageTitle = getByText("Welcome back!");
    expect(pageTitle).toBeInTheDocument();
  });

  test("show error message and dont call api when form is empty and button is clicked", () => {
    const { getByRole, getByTestId } = render(<LoginForm />);
    const submitBtn = getByRole("button", { name: "Sign in" });

    act(() => {
      fireEvent.click(submitBtn);
      expect(fetchWrapper).toHaveBeenCalledTimes(0)
    })

    const errorMessage = getByTestId("error-message")
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.textContent).toBe("Please fill all the fields")
  });

  test("show loading when form is being submitted", () => {

  })

  test("log user in when fields are filled and sign in button is clicked", () => {

    const { getByRole, getByTestId } = render(<LoginForm />);

    const signInBtn = getByRole("button", { name: "Sign in" });
    const usernameInput = getByTestId("username-input");
    const passwordInput = getByTestId("password-input");

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'vini@gmail.com' } })
      fireEvent.change(passwordInput, { target: { value: 'vini123' } })

      expect(usernameInput).toHaveValue('vini@gmail.com')
      expect(passwordInput).toHaveValue('vini123')

      fireEvent.click(signInBtn)

      expect(fetchWrapper).toHaveBeenCalledTimes(1);
      expect(fetchWrapper).toHaveBeenCalledWith("/api/login", {
        body: {
          username: 'vini@gmail.com',
          password: 'vini123'
        },
        method: "POST"
      })

    })



  })
})


