// Mocks : ALL Imports are Mock funtions :

// Mock @google/genai FIRST before other imports... (Since API fetches have problems without mock...)
// Mocking the GoogleGenAI module for the better Experience.... (for testing purposes...)
jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({})),
}));

// Mock API fetches to prevent network errors in Sidebar.....
jest.mock("../api/prompt/fetchPrompt", () => ({
  // Mock the fetchPrompts function with a resolved value.....
  fetchPrompts: jest
    .fn()
    .mockResolvedValue([{ input: "Bengaluru" }, { input: "Mumbai" }]),
}));

// Mock asset imports used in Sidebar....
jest.mock("../assets/assets.js", () => ({
  assets: {
    gyaanagrha: "gyaanagrha-logo.png",
    plus: "plus-icon.png",
  },
}));

// Test libraries and app modules from the imports...
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/sidebar/sidebar.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Context } from "../context/context.jsx";

describe("Sidebar Component", () => {
  // Mock context value......
  const mockContextValue = {
    onSent: jest.fn(),
    prevPrompts: [{ input: "Bengaluru" }, { input: "Mumbai" }],
    setRecentPrompt: jest.fn(),
    newChat: jest.fn(),
    setPrevPrompts: jest.fn(),
    extended: true,
    setExtended: jest.fn(),
  };

  // HelperFunction to render the sidebar......
  const renderSidebar = () =>
    render(
      <Context.Provider value={mockContextValue}>
        <Router>
          <Sidebar />
        </Router>
      </Context.Provider>
    );

  // Testing the Sidebar Component......
  test("renders both logos (gyaanagrha and plus icon)", () => {
    renderSidebar();

    // Grab all images by role.....
    const images = screen.getAllByRole("img", { hidden: true });
    // Expecting 2 logos from the assets...
    expect(images.length).toBeGreaterThanOrEqual(2);
  });

  // Testing the Sidebar Component (Maily the one which are Static)......
  test("renders all static sidebar menu items", () => {
    renderSidebar();

    const menuItems = [
      "Chat with MGPT AI",
      "Neighborhood Fit Area",
      "My Areas",
      "My Favourites",
      "Interactive Map Layer",
      "Weight Score Model",
    ];

    // Expected Output... (for-loop for chack...)
    for (const text of menuItems) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
  });

  test("renders recent state search items", () => {
    renderSidebar();

    expect(screen.getByText("Bengaluru")).toBeInTheDocument();
    expect(screen.getByText("Mumbai")).toBeInTheDocument();
  });

  test("triggers alert on Help button click", () => {
    window.alert = jest.fn();
    renderSidebar();

    fireEvent.click(screen.getByText("Help"));

    expect(window.alert).toHaveBeenCalled();
  });
});
