import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../src/components/Register.jsx";
import { describe, test, expect, beforeEach, vi } from "vitest";

describe(`Form test suite`, () => {
  const registerUser = vi.fn();
  beforeEach(() => {
    render(<Register registerUser={registerUser} />);
  });

  describe(`form render tests`, () => {
    test(`it should render form component`, () => {
      expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    });

    test(`t should render the new value in the input when the password field is updated`, async () => {
      const testPassword = `Tester`;
      const emailInput = screen.getByPlaceholderText(/password/i);

      expect(emailInput).toHaveValue(``);

      await userEvent.type(emailInput, testPassword);

      expect(emailInput).toHaveValue(testPassword);
    });
  });
});
