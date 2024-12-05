import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotesContext } from "../../src/context/NotesContext"; // Ensure this path is correct
import Card from "../../src/components/Card";

describe("Note Card Page", () => {
  it("should render note card with title, subtext, and date", () => {
    // Mock notes data
    const mockNotes = [
      {
        id: "1",
        title: "Sample Note Title",
        content: "This is a short summary of the note content.",
        date: "2024-11-19",
        notecolor: "#f0f0f0",
      },
    ];

    // Mock NotesContext provider value
    const mockContextValue = { notes: mockNotes };

    render(
      <MemoryRouter>
        <NotesContext.Provider value={mockContextValue}>
          <Card />
        </NotesContext.Provider>
      </MemoryRouter>
    );

    // Check if the note title is displayed
    const titleElement = screen.getByText(/Sample Note Title/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the note content (trimmed) is displayed
    const contentElement = screen.getByText(/This is a short summary/i);
    expect(contentElement).toBeInTheDocument();

    // Use a regex to match part of the date (ignore the day of the week)
  const dateElement = screen.getByText(/19 November 2024/); 
  expect(dateElement).toBeInTheDocument();
    
  });
});
