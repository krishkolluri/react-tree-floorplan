import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock SvgViewer to test only the rendering of tree and selection behavior
jest.mock("./components/SVGViwer", () => () => <div data-testid="floorplan">Floorplan</div>);

// Test data structure
const locationDataMock = [
  {
    id: "1",
    name: "Germany",
    children: [
      {
        id: "1-1",
        name: "Berlin",
        children: [
          {
            id: "1-1-1",
            name: "Building A",
            floorplan: "floor1.svg",
          },
          {
            id: "1-1-2",
            name: "Building B",
            floorplan: "floor2.svg",
          },
        ],
      },
    ],
  },
];

describe("App Component", () => {
  test("renders the location tree", () => {
    render(<App />);

    // Check if the location tree items are present
    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.getByText("Building A")).toBeInTheDocument();
    expect(screen.getByText("Building B")).toBeInTheDocument();
  });

  test("renders floorplan when a building is clicked", () => {
    render(<App />);

    // Click on Building A to select it and show the floorplan
    fireEvent.click(screen.getByText("Building A"));

    // Ensure that the floorplan is displayed
    expect(screen.getByTestId("floorplan")).toBeInTheDocument();
    expect(screen.getByText("Floorplan")).toBeInTheDocument();
  });

  test("expands and collapses location nodes correctly", () => {
    render(<App />);

    // Initially, the node should be collapsed, so it should show "[+]"
    expect(screen.getByText("[+] Germany")).toBeInTheDocument();

    // Click on the Germany node to expand it
    fireEvent.click(screen.getByText("[+] Germany"));

    // After expansion, the node should show "[-]"
    expect(screen.getByText("[-] Germany")).toBeInTheDocument();

    // Check if the children (Berlin) are displayed after expanding
    expect(screen.getByText("Berlin")).toBeInTheDocument();
  });

  test("does not show floorplan when a non-building node is clicked", () => {
    render(<App />);

    // Click on a non-building node (Germany) and ensure no floorplan is shown
    fireEvent.click(screen.getByText("Germany"));
    expect(screen.queryByTestId("floorplan")).not.toBeInTheDocument();
  });

  test("renders correct color options", () => {
    render(<App />);

    // Test the presence of color dropdown
    const colorDropdown = screen.getByLabelText("Color");
    fireEvent.mouseDown(colorDropdown);
    const colorOptions = screen.getAllByRole("menuitem");

    // Check that the color options are present
    expect(colorOptions.length).toBeGreaterThan(0);
    expect(colorOptions[0]).toHaveStyle("background-color");
  });

  test("changes color selection correctly", () => {
    render(<App />);

    // Click on the color dropdown
    const colorDropdown = screen.getByLabelText("Color");
    fireEvent.mouseDown(colorDropdown);
    const firstColorOption = screen.getAllByRole("menuitem")[0];
    fireEvent.click(firstColorOption);

    // Check if the selected color is updated correctly
    expect(colorDropdown).toHaveValue(firstColorOption.textContent);
  });
});
