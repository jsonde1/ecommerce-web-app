import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChangePassword from "../src/components/ChangePassword.jsx";
import { describe, test, expect, beforeEach, vi } from "vitest";

describe(`Form test suite`, () => {
  const changePassword = vi.fn();
  beforeEach(() => {
    render(<ChangePassword passwordChange={changePassword} />);
  });

  describe(`form render tests`, () => {
    test(`it should render change password component`, () => {
      expect(
        screen.getByPlaceholderText(/current Password/i)
      ).toBeInTheDocument();
    });
    test(`it should render the new value in the input when the newPassword field is is updated`, async () => {
      const newPasswordTest = `Tester`;
      const itemInput = screen.getByPlaceholderText(/new Password/i);

      expect(itemInput).toHaveValue(``);

      await userEvent.type(itemInput, newPasswordTest);

      expect(itemInput).toHaveValue(newPasswordTest);
    });
  });
});
