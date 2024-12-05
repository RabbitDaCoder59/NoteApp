import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import EditProfile from "../../src/components/Editprofile";
import axios from "axios";

// Mock external dependencies
vi.mock("axios"); // Mock axios
global.URL.createObjectURL = vi.fn(() => "blob:mock-url");
// Mock react-router-dom with partial implementation
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Import actual module
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Mock only the useNavigate hook
  };
});

describe("EditProfile Component", () => {
  it("renders the component", () => {
    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );

    // Check if profile image is rendered
    expect(screen.getByAltText("Profile")).toBeInTheDocument();

    // Check if input fields are rendered
    expect(screen.getByLabelText("Old Password")).toBeInTheDocument();
    expect(screen.getByLabelText("New Password")).toBeInTheDocument();

    // Check if update button is rendered
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });

  
  it("shows validation errors when submitting invalid data", async () => {
    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );

    // Find and click the submit button
    const submitButton = screen.getByRole("button", { name: "Update" });
    fireEvent.click(submitButton);

    // Wait for the validation errors to appear
    await waitFor(() => {
      expect(
        screen.getByText("Password is required")
      ).toBeInTheDocument(); // For old password
      expect(
        screen.getByText("New Password is required")
      ).toBeInTheDocument(); // For new password
    });
  });


  it("submits the form with valid data", async () => {
    axios.put.mockResolvedValueOnce({ data: {} });

    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );

    const oldPasswordInput = screen.getByLabelText(/Old Password/i);
    const newPasswordInput = screen.getByLabelText(/New Password/i);
    const updateButton = screen.getByRole("button", { name: "Update" });

    fireEvent.change(oldPasswordInput, { target: { value: "oldPassword123" } });
    fireEvent.change(newPasswordInput, { target: { value: "newPassword123" } });
    fireEvent.click(updateButton);

    // Wait for the form submission
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:3001/auth/editProfile",
        { oldPassword: "oldPassword123", newPassword: "newPassword123" },
        expect.any(Object)
      );
    });
  });


  it("handles file upload", async () => {
    // Mock axios.put to simulate successful file upload
    axios.put.mockResolvedValueOnce({
      data: { message: "Profile image uploaded successfully" },
    });

    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );

    // Find the file input by test ID
    const fileInput = screen.getByTestId("file-input");

    // Create a mock file
    const file = new File(["dummy content"], "example.png", { type: "image/png" });

    // Simulate file upload
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for the profile image to update
    await waitFor(() => {
      const profileImage = screen.getByAltText("Profile");
      expect(profileImage.src).toContain("blob:mock-url"); // Check the updated image source
    });
  });

  // excluded testing

  // test for when password does not match
  // it("shows error when passwords do not match", async () => {
  //   render(
  //     <BrowserRouter>
  //       <EditProfile />
  //     </BrowserRouter>
  //   );
  
  //   // Fill in mismatched passwords
  //   fireEvent.change(screen.getByLabelText("New Password"), {
  //     target: { value: "password123" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Confirm New Password"), {
  //     target: { value: "password321" },
  //   });
  
  //   // Submit the form
  //   fireEvent.click(screen.getByRole("button", { name: "Update" }));
  
  //   // Wait for the error message to appear
  //   await waitFor(() => {
  //     expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  //   });
  // });
  

  // test for invaild email format
  // it("shows error when email is not in the correct format", async () => {
  //   render(
  //     <BrowserRouter>
  //       <EditProfile />
  //     </BrowserRouter>
  //   );
  
  //   // Enter an invalid email
  //   fireEvent.change(screen.getByLabelText("Email"), {
  //     target: { value: "invalid-email" },
  //   });
  
  //   // Submit the form
  //   fireEvent.click(screen.getByRole("button", { name: "Update" }));
  
  //   // Wait for the error message to appear
  //   await waitFor(() => {
  //     expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
  //   });
  // });

  //test for when password is at the min password length
  // it("shows error when password is below minimum length", async () => {
  //   render(
  //     <BrowserRouter>
  //       <EditProfile />
  //     </BrowserRouter>
  //   );
  
  //   // Enter a short password
  //   fireEvent.change(screen.getByLabelText("New Password"), {
  //     target: { value: "123" }, // Assume minimum length is 6
  //   });
  
  //   // Submit the form
  //   fireEvent.click(screen.getByRole("button", { name: "Update" }));
  
  //   // Wait for the error message to appear
  //   await waitFor(() => {
  //     expect(
  //       screen.getByText("Password must be at least 6 characters")
  //     ).toBeInTheDocument();
  //   });
  // });

  // test for when password is at the max password length
  // it("shows error when password exceeds maximum length", async () => {
  //   render(
  //     <BrowserRouter>
  //       <EditProfile />
  //     </BrowserRouter>
  //   );
  
  //   // Enter a long password
  //   fireEvent.change(screen.getByLabelText("New Password"), {
  //     target: { value: "a".repeat(101) }, // Assume max length is 100
  //   });
  
  //   // Submit the form
  //   fireEvent.click(screen.getByRole("button", { name: "Update" }));
  
  //   // Wait for the error message to appear
  //   await waitFor(() => {
  //     expect(
  //       screen.getByText("Password cannot exceed 100 characters")
  //     ).toBeInTheDocument();
  //   });
  // });
  
  
  
});
