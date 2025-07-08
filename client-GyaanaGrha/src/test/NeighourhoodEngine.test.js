import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NeighourhoodEngine from "../components/neighourhoodengine/neighourhoodengine.jsx";
import { BrowserRouter as Router } from "react-router-dom";

// Mock API Calls...
jest.mock("../api/neighourEngine/neighourhoodEngine.js", () => ({
  // Mock the fetchNeighborhoodData function with a resolved value.....
  fetchNeighborhoodData: jest.fn().mockResolvedValue([
    {
      circlename: "Test Circle",
      regionname: "Test Region",
      divisionname: "Test Division",
      officename: "Test Office",
      pincode: "123456",
      officetype: "Head Office",
      delivery: "Yes",
      district: "Test District",
      statename: "Test State",
      latitude: "12.9716",
      longitude: "77.5946",
    },
  ]),
}));

// Mock functions for API Calls(fetchPrompts)...
jest.mock("../api/prompt/fetchPrompt.js", () => ({
  pushPrompt: jest.fn(), // Push new prompt fn()..
}));

// Mock functions for API Calls for useCarts (My Areas)...
jest.mock("../api/cart/useCart.js", () => ({
  pushCarts: jest.fn(), // Push new Carts fn()..
}));

describe("NeighourhoodEngine Component", () => {
  test("renders input fields and search button", () => {
    render(
      <Router>
        <NeighourhoodEngine />
      </Router>
    );
    // Expected Output...
    expect(screen.getByLabelText("State Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Pincode")).toBeInTheDocument();
    expect(screen.getByLabelText("District Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Exam Preparation")).toBeInTheDocument();
    expect(screen.getByText("SEARCH")).toBeInTheDocument();
  });

  // Pincode Validation... (Works in production...)
  test("shows alert for invalid pincode", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <NeighourhoodEngine />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Pincode"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("SEARCH"));
    expect(window.alert).toHaveBeenCalledWith(
      "Please enter at least one field"
    );
  });

  // fetch Neighborhood Data...
  test("fetches and displays neighborhood data on valid search", async () => {
    render(
      <Router>
        <NeighourhoodEngine />
      </Router>
    );
    // Expected Inputs...
    fireEvent.change(screen.getByLabelText("State Name"), {
      target: { value: "Karnataka" },
    });
    fireEvent.change(screen.getByLabelText("Pincode"), {
      target: { value: "560001" },
    });
    fireEvent.click(screen.getByText("SEARCH"));

    // Expected Output...
    await waitFor(() => {
      expect(screen.getByText("Test Office")).toBeInTheDocument();
    });
  });

  // No Data Found...
  test("displays alert if no data is found", async () => {
    window.alert = jest.fn();
    const {
      fetchNeighborhoodData,
    } = require("../api/neighourEngine/neighourhoodEngine.js");
    fetchNeighborhoodData.mockResolvedValueOnce([]);

    render(
      <Router>
        <NeighourhoodEngine />
      </Router>
    );

    // Expected Inputs...
    fireEvent.change(screen.getByLabelText("State Name"), {
      target: { value: "Karnataka" },
    });
    fireEvent.change(screen.getByLabelText("Pincode"), {
      target: { value: "560001" },
    });
    fireEvent.click(screen.getByText("SEARCH"));

    // Expected Output...
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("No Data Found");
    });
  });
});
