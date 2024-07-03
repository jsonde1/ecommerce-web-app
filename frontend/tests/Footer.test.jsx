import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Footer from "../src/components/Footer";
test(`Footer matches snapshot`, () => {
  expect(render(<Footer />)).toMatchSnapshot();
});
