import { render } from "@testing-library/react";
import Header from "../src/components/Header.jsx";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";

test(`Header matches snapshot when no user is logged in`, () => {
  const user = {};
  expect(
    render(
      <MemoryRouter>
        <Header user={user} />
      </MemoryRouter>
    )
  ).toMatchSnapshot();
});
