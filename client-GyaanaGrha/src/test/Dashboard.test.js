import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboard/dashboard.jsx";

// Mock Data : for testing purposes....
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Checking the DASHBOARD component.....
describe("Dashboard Component", () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockedNavigate);
  });

  // Testing the welcome messages.... (mailnly what Comes after Refresh.....)
  test("renders welcome messages", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Checks for the welcome messages...
    expect(screen.getByText("Welcome to GyaanaGrha!")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Ready to discover the perfect place that fuels your goals/i
      )
    ).toBeInTheDocument();
    // Expected Output...
    expect(
      screen.getByText(/Let’s build your future neighborhood together/i)
    ).toBeInTheDocument();
  });

  // Testing the button for the navigating...
  test("navigates on button click", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Checks for the button Click and Should navigate to the next page "/neighborhood-fit-engine"...
    const startButton = screen.getByText("Click to Get Started");
    fireEvent.click(startButton);
    // Checks for the navigation...
    expect(mockedNavigate).toHaveBeenCalledWith("/neighborhood-fit-engine");
  });
});
