import { render, screen } from "@testing-library/react";
import AdminPage from "../src/pages/AdminPage.jsx";
import { describe, test, expect, beforeEach, vi, waitFor } from "vitest";
import jest from "jest-mock";
import { MemoryRouter } from "react-router-dom";

describe(`Form test suite`, () => {
  beforeEach(() => {});

  describe(`admin  tests`, () => {
    test(`it should render admin text if user is admin`, () => {
      render(<AdminPage admin={true} />);
      expect(screen.getByText("AdminPage")).toBeInTheDocument();
    });

    test(`it should render alert if user is not admin`, async () => {
      const alertMock = jest.spyOn(window, "alert").mockImplementation();
      render(
        <MemoryRouter>
          <AdminPage admin={false} />
        </MemoryRouter>
      );
      expect(alertMock).toHaveBeenCalledTimes(1);
    });
  });
});
