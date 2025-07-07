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

  test("renders greeting and cards when showResult is false", () => {
    render(
      <Context.Provider value={mockContext}>
        <MgptAI />
      </Context.Provider>
    );

    expect(screen.getByText(/Hi, Ashmin!/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome to GyaanaGrha/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        /Ask Anything related to NFP, Educational Zones/i
      )
    ).toBeInTheDocument();
  });

  test("calls onSent when send icon is clicked with input", async () => {
    const updatedContext = {
      ...mockContext,
      input: "Tell me about NEET zones",
    };

    render(
      <Context.Provider value={updatedContext}>
        <MgptAI />
      </Context.Provider>
    );

    // Wait for images to appear
    const allImages = await screen.findAllByRole("img");
    const sendIcon = allImages.find((img) => img.src.includes("send"));

    expect(sendIcon).toBeInTheDocument();

    fireEvent.click(sendIcon);

    expect(updatedContext.onSent).toHaveBeenCalled();
  });

  test("renders result section when showResult is true and not loading", () => {
    const resultContext = {
      ...mockContext,
      showResult: true,
    };

    render(
      <Context.Provider value={resultContext}>
        <MgptAI />
      </Context.Provider>
    );

    expect(screen.getByText(resultContext.recentPrompt)).toBeInTheDocument();
    expect(
      screen.getByText("GyaanaGrha is an AI-powered education assistant.")
    ).toBeInTheDocument();
  });

  test("shows alert when pressing enter with empty input", () => {
    window.alert = jest.fn();

    const emptyInputContext = {
      ...mockContext,
      input: "",
    };

    render(
      <Context.Provider value={emptyInputContext}>
        <MgptAI />
      </Context.Provider>
    );

    const inputBox = screen.getByPlaceholderText(/Ask Anything/i);

    fireEvent.keyDown(inputBox, { key: "Enter", code: "Enter" });

    expect(window.alert).toHaveBeenCalledWith("Please Enter Something...");
  });
});
