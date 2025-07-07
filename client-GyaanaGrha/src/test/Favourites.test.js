import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Myfavourites from "../components/favourites/favourites.jsx";
import * as FavouritesAPI from "../api/favourites/useFavourites.js";

// Mock the fetchFavourites and deleteFavourites functions
jest.mock("../api/favourites/useFavourites", () => ({
  fetchFavourites: jest.fn(),
  deleteFavourites: jest.fn(),
}));

// Check the Myfavourites component....
describe("Myfavourites Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Check for the rendering of the component if Cards area Empty...
  test("renders without crashing and shows empty card when no favorites", async () => {
    FavouritesAPI.fetchFavourites.mockResolvedValue({ data: [] });

    render(<Myfavourites />);

    await waitFor(() => {
      // Expect Result to be "MY FAVOURITES" should be present by [] array....
      expect(
        screen.getByText("MY FAVOURITES", { exact: false })
      ).toBeInTheDocument();
    });

    // Check for default dummy card
    expect(screen.getByText("Chennai Circle")).toBeInTheDocument();
  });

  test("renders fetched favorites when data is returned", async () => {
    // Mock data...
    const mockData = {
      data: [
        {
          _id: "456",
          regionname: "DivReportingCircle",
          divisionname: "Delhi North Division",
          officename: "Palla BO",
          pincode: "110036",
          officetype: "BO",
          district: "NORTH",
          statename: "DELHI",
        },
      ],
    };

    // Mock the fetchFavourites function....
    FavouritesAPI.fetchFavourites.mockResolvedValue(mockData);

    render(<Myfavourites />);

    await waitFor(() => {
      expect(screen.getByText("Palla BO")).toBeInTheDocument();
    });

    // Expected Output... (/<parseName>/i : Mainly use in this type for Case Sensitive....)
    expect(screen.getByText("110036")).toBeInTheDocument();
    expect(screen.getByText(/Delhi North Division/i)).toBeInTheDocument();
    expect(screen.getByText(/DivReportingCircle/i)).toBeInTheDocument();
    expect(screen.getByText(/DELHI/i)).toBeInTheDocument();
  });
});
