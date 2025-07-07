import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WSM from "../components/wsm/wsm.jsx";

describe("WSM Component - Input Fields", () => {
  test("renders and accepts input values correctly", () => {
    render(<WSM />);

    // Find the input fields from the WSM component....
    const coachingInput = screen.getByLabelText(/Coaching/i);
    const librariesInput = screen.getByLabelText(/Libraries/i);
    const rentInput = screen.getByLabelText(/Rent/i);
    const areaInput = screen.getByLabelText(/Area/i);
    const examNameInput = screen.getByLabelText(/Exam Name/i);

    // Use fireEvent.input (more reliable with MUI) : for the values to set in the Input.....
    fireEvent.input(coachingInput, { target: { value: "7" } });
    fireEvent.input(librariesInput, { target: { value: "6" } });
    fireEvent.input(rentInput, { target: { value: "5" } });
    fireEvent.input(areaInput, { target: { value: "4" } });
    fireEvent.input(examNameInput, { target: { value: "CAT" } });

    // Assertions : To check for the values Checked in the Input Field are Valid or Not.....
    expect(coachingInput.value).toBe("7");
    expect(librariesInput.value).toBe("6");
    expect(rentInput.value).toBe("5");
    expect(areaInput.value).toBe("4");
    expect(examNameInput.value).toBe("CAT");
  });
});
