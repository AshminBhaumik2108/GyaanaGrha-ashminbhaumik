import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MyAreas from "../components/myarea/myarea.jsx";
import * as CartAPI from "../api/cart/useCart.js";

// Mock the API module (Since used for the testing purposes...)
jest.mock("../api/cart/useCart", () => ({
  fetchCarts: jest.fn(),
  deleteCarts: jest.fn(),
}));

// Check the MyAreas component....
describe("MyAreas Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // testing the rendering of the component...
  test("renders fallback dummy card when no areas are present", async () => {
    CartAPI.fetchCarts.mockResolvedValue({ data: [] });

    render(<MyAreas />);

    await waitFor(() => {
      expect(
        screen.getByText("MY AREAS", { exact: false })
      ).toBeInTheDocument();
    });
    // Expected Output...
    expect(screen.getByText("Chennai Circle")).toBeInTheDocument();
    expect(
      screen.getByText("WSM Score (Higher is Better) :", { exact: false })
    ).toBeInTheDocument();
  });

  test("renders fetched area cards when data is present", async () => {
    // Mock data for testing...
    const mockData = {
      data: [
        {
          _id: "abc123",
          regionname: "South Region",
          divisionname: "South Division",
          officename: "Mysore Office",
          pincode: "570001",
          officetype: "Head Office",
          district: "Mysore",
          statename: "Karnataka",
          circlename: "South Circle",
          delivery: "Yes",
          latitude: "12.2958",
          longitude: "76.6394",
        },
      ],
    };

    // Send the mock data to the API fetchCarts function...
    CartAPI.fetchCarts.mockResolvedValue(mockData);

    render(<MyAreas />);
    // Wait for the component to render to get the Expected Output...
    await waitFor(() => {
      expect(screen.getByText("Mysore Office")).toBeInTheDocument();
    });

    // Expected Output... (Handeled Checks for the case sensitive....)
    expect(screen.getByText("570001")).toBeInTheDocument();
    expect(screen.getByText(/South Region/i)).toBeInTheDocument();
    expect(screen.getByText(/Karnataka/i)).toBeInTheDocument();
    expect(screen.getByText(/WSM Score/i)).toBeInTheDocument();
  });
});
