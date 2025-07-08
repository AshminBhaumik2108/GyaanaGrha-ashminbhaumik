import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MgptAI from "../components/mgptAI/mgptAI";
import { Context } from "../context/context";

// Mock the GoogleGenAI module for the better Experience....
jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    generateContent: jest
      .fn()
      .mockResolvedValue({ response: { text: "Mocked response" } }),
  })),
}));

// Mock Datas for the test files....
jest.mock("../assets/assets", () => ({
  assets: {
    send: "send.png",
    mic: "mic.png",
    gallery: "gallery.png",
    gemini: "gemini.png",
    gyaanagrha: "logo.png",
  },
}));

describe("mgptAI Component", () => {
  // Mock Context for Checking the Components.... (Only Just for testing purposes...)
  const mockContext = {
    prevPrompts: [],
    setPrevPrompts: jest.fn(),
    onSent: jest.fn(),
    setRecentPrompt: jest.fn(),
    recentPrompt: "What is GyaanaGrha?",
    showResult: false,
    loading: false,
    resultData: "<p>GyaanaGrha is an AI-powered education assistant.</p>",
    input: "What is GyaanaGrha?",
    setInput: jest.fn(),
  };
  // Testing the MGPT AI Component by parsing the Mock Data...
  test("renders greeting and cards when showResult is false", () => {
    render(
      <Context.Provider value={mockContext}>
        <MgptAI />
      </Context.Provider>
    );
    // Expected Output...
    expect(screen.getByText(/Hi, Ashmin!/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome to GyaanaGrha/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        /Ask Anything related to NFP, Educational Zones/i
      )
    ).toBeInTheDocument();
  });
  // Testing the MGPT AI Component by Updating the Mock Data by appending input: "Tell me about NEET zones"...
  test("calls onSent when send icon is clicked with input", async () => {
    const updatedContext = {
      ...mockContext,
      input: "Tell me about NEET zones",
    };
    // Render the component by parsing the updateContext to the MGPTAI Component for testing...
    render(
      <Context.Provider value={updatedContext}>
        <MgptAI />
      </Context.Provider>
    );

    // Wait for images to appear.... (USed alt="<some-data>", So that Images are loaded and the Test Doesn't fail....)
    const allImages = await screen.findAllByRole("img");
    const sendIcon = allImages.find((img) => img.src.includes("send"));
    // Expected Output (Images)...
    expect(sendIcon).toBeInTheDocument();
    // click the send icon : test....
    fireEvent.click(sendIcon);
    // Expected Output (updatedContext)...
    expect(updatedContext.onSent).toHaveBeenCalled();
  });

  // Testing the result section...
  test("renders result section when showResult is true and not loading", () => {
    const resultContext = {
      ...mockContext,
      showResult: true,
    };
    // Render the component by parsing the resultContext to the MGPTAI Component for testing...
    render(
      <Context.Provider value={resultContext}>
        <MgptAI />
      </Context.Provider>
    );
    // Expected Output...
    expect(screen.getByText(resultContext.recentPrompt)).toBeInTheDocument();
    expect(
      screen.getByText("GyaanaGrha is an AI-powered education assistant.")
    ).toBeInTheDocument();
  });

  // Testing the input box...
  test("shows alert when pressing enter with empty input", () => {
    window.alert = jest.fn();
    // appending the empty input to the Mock Context...
    const emptyInputContext = {
      ...mockContext,
      input: "",
    };

    // Render the component by parsing the emptyInputContext to the MGPTAI Component for testing...
    render(
      <Context.Provider value={emptyInputContext}>
        <MgptAI />
      </Context.Provider>
    );

    const inputBox = screen.getByPlaceholderText(/Ask Anything/i);
    fireEvent.keyDown(inputBox, { key: "Enter", code: "Enter" }); // Checking the keyDown event...
    // Expected Output...
    expect(window.alert).toHaveBeenCalledWith("Please Enter Something...");
  });
});
