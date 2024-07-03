import { render, screen } from "@testing-library/react";

import App from "../src/App";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("App Tests", () => {
  describe("App render tests", () => {
    it("should render Search form on initial render", async () => {
      // Arrange
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      // Act
      const searchform = screen.getByText("Search...");
      // Assert
      expect(searchform).toBeInTheDocument();
    });
  });
});
