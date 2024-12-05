import React from "react";
import { render, screen } from "@testing-library/react";
import Emptynote from "../../src/components/Emptynote";

describe("Empty Note Page", () => {
  it("should render empty note page with illustration image and text", () => {
    render(<Emptynote />);

    // Check if the illustration image is displayed
    const illustrationImage = screen.getByAltText("Ilustration1");
    expect(illustrationImage).toBeInTheDocument();

    // Check if the heading text is displayed
    const headingText = screen.getByText(/Create your first Note!/i);
    expect(headingText).toBeInTheDocument();
  });
});
