import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import NoteEditor from "../../src/pages/NoteEditor";
import { vi } from "vitest";
import { toast } from "react-toastify";

// Mock axios
vi.mock("axios");

// Partially mock react-toastify
vi.mock("react-toastify", async () => {
  const actual = await vi.importActual("react-toastify");
  return {
    ...actual,
    toast: { error: vi.fn(), success: vi.fn() },
  };
});

// Mock useNavigate globally
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("NoteEditor Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it("renders the component correctly", () => {
    render(
      <BrowserRouter>
        <NoteEditor />
      </BrowserRouter>
    );

    // Check for the title and content textareas
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Type something...")
    ).toBeInTheDocument();

    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeInTheDocument();
  });

  it("updates title and content inputs", () => {
    render(
      <BrowserRouter>
        <NoteEditor />
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText("Title");
    const contentInput = screen.getByPlaceholderText("Type something...");

    fireEvent.change(titleInput, { target: { value: "My New Note" } });
    fireEvent.change(contentInput, {
      target: { value: "This is the content." },
    });

    expect(titleInput.value).toBe("My New Note");
    expect(contentInput.value).toBe("This is the content.");
  });

  it("shows a validation error if title is empty", async () => {
    render(<NoteEditor />);

    // Ensure title input is empty
    const titleInput = screen.getByPlaceholderText("Title");
    fireEvent.change(titleInput, { target: { value: "" } });

    // Find the save button and click it
    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    // Wait for the validation error to be shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledTimes(1); // Ensure that the toast.error was called once
      expect(toast.error).toHaveBeenCalledWith(
        "Please enter a title for your note!"
      );
    });
  });

  it("saves the note with valid data", async () => {
    // Mock the POST request to return a successful response
    axios.post.mockResolvedValue({ data: { success: true } });

    // Set up the necessary items in localStorage
    localStorage.setItem("accessToken", "valid-token");
    localStorage.setItem("userId", JSON.stringify("valid-user-id"));

    render(<NoteEditor />);

    // Simulate entering valid data
    const titleInput = screen.getByPlaceholderText("Title");
    const contentInput = screen.getByPlaceholderText("Type something...");
    const saveButton = screen.getByRole("button", { name: /save/i });

    // Fill out the form with valid data
    fireEvent.change(titleInput, { target: { value: "Valid Title" } });
    fireEvent.change(contentInput, { target: { value: "Valid Content" } });

    // Simulate clicking the save button
    fireEvent.click(saveButton);

    // Wait for the POST request to be called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3001/notes",
        {
          title: "Valid Title",
          content: "Valid Content",
          userId: "valid-user-id", // Make sure userId is passed correctly
        },
        {
          headers: { Authorization: "Bearer valid-token" }, // Ensure the correct Authorization header is used
        }
      );
    });
  });
});
