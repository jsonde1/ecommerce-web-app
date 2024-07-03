import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AllListings from "../src/pages/AllListings.jsx";
import * as listingservices from "../src/services/listing.service.js";
import { describe, test, expect, beforeEach, vi, waitFor } from "vitest";

describe(`Form test suite`, () => {
  const getAllListings = vi.fn();
  beforeEach(() => {});

  describe(`form render tests`, () => {
    test.skip(`it should render Search form component`, () => {
      render(<AllListings getAllListings={getAllListings} />);
      expect(
        screen.getByPlaceholderText(/Search for .../i)
      ).toBeInTheDocument();
    });

    test.skip(`it should render search button`, async () => {
      const res = {
        data: [
          {
            id: 1,
            Title: "Test Listing",
            Condition: "New",
            Price: 200,
            Description: "Test Description",
            UserID: 1,
            MainImage: "Test Image",
            CreationDate: "2021-09-20T00:00:00.000Z",
            Status: "Sold",
            Name: "Tester Man",
            PhoneNumber: "0947883945",
          },
        ],
      };
      listingservices.getAllListings.mockResolvedValueOnce(res);
      render(<AllListings getAllListings={getAllListings} />);
      expect(
        await waitFor(() => screen.getByRole("table"))
      ).toBeInTheDocument();
    });
  });
});
