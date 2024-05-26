import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { LoginForm } from "./login-form";
import { act } from "react";

describe(LoginForm, () => {
  beforeEach(() => {
  })

  test("render login form correctly", () => {
    const { getByText } = render(<LoginForm />);
    const pageTitle = getByText("Welcome back!");
    expect(pageTitle).toBeInTheDocument();
  });

  test("show error message when form is empty after 1 second", () => {
    const { getByRole, getByTestId } = render(<LoginForm />);
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout")

    const submitBtn = getByRole("button", { name: "Sign in" });
    
    act(() => {
      fireEvent.click(submitBtn);
      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      jest.runAllTimers();
    })

    const errorMessage = getByTestId("error-message")
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.textContent).toBe("Please fill all the fields")
  });
})


